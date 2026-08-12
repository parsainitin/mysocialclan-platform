import { NextRequest } from "next/server";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";
const SECRET = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSWORD || "mysocialclan-superadmin-secret-key-2026";

export function getAdminUsername(): string {
  return (process.env.ADMIN_USERNAME || "admin").trim();
}

export function getAdminPassword(): string {
  return (process.env.ADMIN_PASSWORD || "superadmin123").trim();
}

/**
 * Sign a payload string with HMAC SHA-256
 */
function signToken(payload: string): string {
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(payload);
  const signature = hmac.digest("hex");
  return `${payload}.${signature}`;
}

/**
 * Verify token payload and signature
 */
function verifyToken(token: string): string | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, signature] = parts;

  const expectedHmac = crypto.createHmac("sha256", SECRET);
  expectedHmac.update(payload);
  const expectedSignature = expectedHmac.digest("hex");

  if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return payload;
  }
  return null;
}

/**
 * Create admin session token valid for 24 hours
 */
export function createAdminSessionToken(username: string): string {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ username, expiresAt })).toString("base64url");
  return signToken(payload);
}

/**
 * Verify admin session from NextRequest cookies
 */
export function verifyAdminSession(request: NextRequest): { username: string } | null {
  try {
    const cookieToken = request.cookies.get(COOKIE_NAME)?.value;
    if (!cookieToken) return null;

    const payloadBase64 = verifyToken(cookieToken);
    if (!payloadBase64) return null;

    const decoded = JSON.parse(Buffer.from(payloadBase64, "base64url").toString("utf-8"));
    if (!decoded || !decoded.username || !decoded.expiresAt) return null;

    if (Date.now() > decoded.expiresAt) return null;

    return { username: decoded.username };
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
