import crypto from "crypto";
import { getTenantUserModel } from "@/models/TenantUser";

export function formatPhoneForWhatsApp(phone: string): string {
  if (!phone) return "";
  let digits = phone.replace(/\D/g, "");
  // Default to India country code 91 if 10 digits provided without country code
  if (digits.length === 10) {
    digits = "91" + digits;
  }
  return digits;
}

export function getAppBaseUrl(req?: any): string {
  // 1. Explicit environment variable if configured
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  // 2. Netlify / Vercel automatic deployment environment variables
  if (process.env.URL) {
    return process.env.URL.replace(/\/$/, "");
  }
  if (process.env.DEPLOY_PRIME_URL) {
    return process.env.DEPLOY_PRIME_URL.replace(/\/$/, "");
  }

  // 3. Dynamic Host header from incoming HTTP request
  if (req) {
    try {
      const getHeader = (name: string) => {
        if (typeof req.headers?.get === "function") return req.headers.get(name);
        return req.headers?.[name];
      };
      const host = getHeader("x-forwarded-host") || getHeader("host");
      const proto = getHeader("x-forwarded-proto") || "https";
      if (host && !host.includes("localhost")) {
        return `${proto}://${host}`;
      }
    } catch {}
  }

  return "http://localhost:3000";
}

export function buildActivationUrl(subdomain: string, token: string, req?: any): string {
  const baseUrl = getAppBaseUrl(req);
  return `${baseUrl}/activate?subdomain=${encodeURIComponent(subdomain)}&token=${encodeURIComponent(token)}`;
}

export function buildWhatsAppInviteUrl(
  phone: string,
  adminName: string,
  communityName: string,
  activationUrl: string
): string {
  const cleanPhone = formatPhoneForWhatsApp(phone);
  const text = `Hello ${adminName}, your community portal "${communityName}" has been approved! Click the link below to complete your Admin account setup:\n\n${activationUrl}\n\nWelcome to MySocialClan!`;
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`;
}

export async function provisionCommunityAdmin(reqDoc: any, req?: any) {
  const subdomain = (reqDoc.subdomain || "").toLowerCase().trim();
  const adminEmail = (reqDoc.adminEmail || `admin@${subdomain}.com`).toLowerCase().trim();
  const adminName = (reqDoc.adminName || "Community Admin").trim();
  const adminMobile = (reqDoc.adminMobile || "").trim();

  // Get tenant-specific User model for comicircle_<subdomain>
  const TenantUserModel = await getTenantUserModel(subdomain);

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  let user = await TenantUserModel.findOne({
    subdomain,
    email: adminEmail,
  });

  if (!user) {
    user = new TenantUserModel({
      subdomain,
      name: adminName,
      email: adminEmail,
      mobile: adminMobile,
      role: "COMMUNITY_ADMIN",
      status: "invited",
      activationToken: token,
      tokenExpiresAt: expiresAt,
    });
  } else {
    user.name = adminName;
    user.mobile = adminMobile;
    user.activationToken = token;
    user.tokenExpiresAt = expiresAt;
    user.status = user.status === "active" ? "active" : "invited";
  }

  await user.save();

  const activationUrl = buildActivationUrl(subdomain, token, req);
  const whatsappUrl = buildWhatsAppInviteUrl(
    adminMobile,
    adminName,
    reqDoc.name || subdomain,
    activationUrl
  );

  return {
    token,
    activationUrl,
    whatsappUrl,
    user,
  };
}


