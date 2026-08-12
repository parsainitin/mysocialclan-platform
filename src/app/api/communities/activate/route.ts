import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { dbConnect } from "@/lib/mongodb";
import { TenantUser } from "@/models/TenantUser";
import { Community } from "@/models/Community";

function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, "mysocialclan-salt-2026", 1000, 64, "sha512").toString("hex");
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subdomain = (searchParams.get("subdomain") || "").trim().toLowerCase();
    const token = (searchParams.get("token") || "").trim();

    if (!subdomain || !token) {
      return NextResponse.json({ error: "Missing subdomain or activation token" }, { status: 400 });
    }

    await dbConnect();

    const user = await TenantUser.findOne({
      subdomain,
      activationToken: token,
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired activation link" }, { status: 404 });
    }

    if (user.tokenExpiresAt && new Date() > user.tokenExpiresAt) {
      return NextResponse.json({ error: "This onboarding link has expired. Please contact platform administration." }, { status: 410 });
    }

    const community = await Community.findOne({ subdomain });

    return NextResponse.json({
      valid: true,
      subdomain,
      communityName: community?.name || subdomain,
      logo: community?.logo,
      adminName: user.name,
      adminEmail: user.email,
      adminMobile: user.mobile,
      status: user.status,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { subdomain, token, password } = await request.json();

    const cleanSubdomain = (subdomain || "").trim().toLowerCase();
    const cleanToken = (token || "").trim();
    const cleanPassword = (password || "").trim();

    if (!cleanSubdomain || !cleanToken || !cleanPassword) {
      return NextResponse.json({ error: "Subdomain, activation token, and password are required" }, { status: 400 });
    }

    if (cleanPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 });
    }

    await dbConnect();

    const user = await TenantUser.findOne({
      subdomain: cleanSubdomain,
      activationToken: cleanToken,
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid activation token" }, { status: 404 });
    }

    if (user.tokenExpiresAt && new Date() > user.tokenExpiresAt) {
      return NextResponse.json({ error: "Activation token has expired" }, { status: 410 });
    }

    user.passwordHash = hashPassword(cleanPassword);
    user.status = "active";
    user.activationToken = undefined;
    user.tokenExpiresAt = undefined;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Community Admin account activated successfully!",
      subdomain: cleanSubdomain,
      adminEmail: user.email,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
