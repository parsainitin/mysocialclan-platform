import { NextRequest, NextResponse } from "next/server";
import { getAdminUsername, getAdminPassword, createAdminSessionToken, COOKIE_NAME } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const cleanUsername = (username || "").trim();
    const cleanPassword = (password || "").trim();

    if (!cleanUsername || !cleanPassword) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const expectedUsername = getAdminUsername();
    const expectedPassword = getAdminPassword();

    if (
      cleanUsername.toLowerCase() !== expectedUsername.toLowerCase() ||
      cleanPassword !== expectedPassword
    ) {
      return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 });
    }

    const token = createAdminSessionToken(cleanUsername);
    const response = NextResponse.json({ success: true, username: cleanUsername });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Login failed" }, { status: 500 });
  }
}
