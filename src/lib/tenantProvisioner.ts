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

export function getAppBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export function buildActivationUrl(subdomain: string, token: string): string {
  const baseUrl = getAppBaseUrl();
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

export async function provisionCommunityAdmin(reqDoc: any) {
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

  const activationUrl = buildActivationUrl(subdomain, token);
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

