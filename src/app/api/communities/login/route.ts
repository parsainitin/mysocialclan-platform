import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { dbConnect } from "@/lib/mongodb";
import { getTenantUserModel } from "@/models/TenantUser";
import { Community } from "@/models/Community";

function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, "mysocialclan-salt-2026", 1000, 64, "sha512").toString("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const { subdomain, loginIdentifier, password } = body;

    const cleanSubdomain = (subdomain || "").trim().toLowerCase();
    const cleanIdentifier = (loginIdentifier || "").trim().toLowerCase();
    const cleanPassword = (password || "").trim();

    if (!cleanSubdomain || !cleanIdentifier || !cleanPassword) {
      return NextResponse.json(
        { error: "Subdomain, Mobile Number or Email, and Password are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Verify community exists
    const community = await Community.findOne({ subdomain: cleanSubdomain });
    if (!community) {
      return NextResponse.json({ error: `Community with subdomain '${cleanSubdomain}' does not exist.` }, { status: 404 });
    }

    // Extract digits for mobile matching (e.g. 9826017177)
    const mobileDigits = cleanIdentifier.replace(/\D/g, "");

    const TenantUserModel = await getTenantUserModel(cleanSubdomain);

    // Search user by email OR by mobile (flexible matching for country code prefixes)
    let user = await TenantUserModel.findOne({
      subdomain: cleanSubdomain,
      $or: [
        { email: cleanIdentifier },
        { mobile: cleanIdentifier },
        ...(mobileDigits.length >= 10
          ? [{ mobile: { $regex: mobileDigits.slice(-10) + "$" } }]
          : []),
      ],
    });

    if (!user) {
      return NextResponse.json(
        { error: `No registered user found with Mobile/Email '${cleanIdentifier}' under community '${cleanSubdomain}'.` },
        { status: 404 }
      );
    }

    // Check account status
    if (user.status === "invited") {
      return NextResponse.json(
        {
          error: "Account onboarding incomplete. Please activate your account using your invite link first to set up your password.",
          requiresActivation: true,
          activationToken: user.activationToken,
        },
        { status: 403 }
      );
    }

    if (user.status === "disabled") {
      return NextResponse.json(
        { error: "This community user account has been disabled. Please contact platform administration." },
        { status: 403 }
      );
    }

    // Check password
    if (!user.passwordHash) {
      return NextResponse.json(
        { error: "Password not set for this account. Please use your onboarding link to activate your password." },
        { status: 400 }
      );
    }

    const computedHash = hashPassword(cleanPassword);
    if (computedHash !== user.passwordHash) {
      return NextResponse.json({ error: "Invalid password provided. Please check your password and try again." }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        status: user.status,
        subdomain: user.subdomain,
      },
      community: {
        name: community.name,
        subdomain: community.subdomain,
        primaryLanguage: community.primaryLanguage,
        logo: community.logo,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Community login failed" }, { status: 500 });
  }
}
