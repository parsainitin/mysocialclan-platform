import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Community } from "@/models/Community";
import { CommunityRequest } from "@/models/CommunityRequest";
import { verifyAdminSession } from "@/lib/adminAuth";
import { provisionCommunityAdmin, buildActivationUrl, buildWhatsAppInviteUrl } from "@/lib/tenantProvisioner";
import { getTenantUserModel } from "@/models/TenantUser";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const session = verifyAdminSession(request);
  if (!session) {
    return Response.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;
    const reqDoc = await CommunityRequest.findById(id).lean();
    if (!reqDoc) return Response.json({ error: "Not found" }, { status: 404 });

    // Find tenant user in comicircle_<subdomain>.users collection
    const TenantUserModel = await getTenantUserModel(reqDoc.subdomain.toLowerCase());
    const tenantUser = await TenantUserModel.findOne({
      subdomain: reqDoc.subdomain.toLowerCase(),
      email: reqDoc.adminEmail.toLowerCase(),
    }).lean();

    let activationUrl = "";
    let whatsappUrl = "";

    if (tenantUser && tenantUser.activationToken) {
      activationUrl = buildActivationUrl(reqDoc.subdomain, tenantUser.activationToken, request);
      whatsappUrl = buildWhatsAppInviteUrl(
        reqDoc.adminMobile,
        reqDoc.adminName,
        reqDoc.name,
        activationUrl
      );
    }

    return Response.json({
      ...reqDoc,
      activationToken: tenantUser?.activationToken,
      activationUrl,
      whatsappUrl,
      adminStatus: tenantUser?.status || "none",
    });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}


export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const session = verifyAdminSession(request);
  if (!session) {
    return Response.json({ error: "Unauthorized access. Super admin authentication required." }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;
    const { status, notes, provisionNow } = await request.json();

    const reqDoc = await CommunityRequest.findById(id);
    if (!reqDoc) {
      return Response.json({ error: "Creation request not found" }, { status: 404 });
    }

    // Ensure fallback for legacy records missing required contact fields
    if (!reqDoc.adminEmail) {
      reqDoc.adminEmail = `admin@${reqDoc.subdomain}.com`;
    }
    if (!reqDoc.adminName) {
      reqDoc.adminName = "Community Admin";
    }
    if (!reqDoc.adminMobile) {
      reqDoc.adminMobile = "";
    }

    if (status) reqDoc.status = status;
    if (notes) reqDoc.notes = notes;
    await reqDoc.save();

    let provisionData: any = null;

    // If provisionNow is true and approved, register Community and seed Tenant Admin Account
    if (provisionNow && status === "approved") {
      const existingCommunity = await Community.findOne({ subdomain: reqDoc.subdomain });
      if (!existingCommunity) {
        await Community.create({
          name: reqDoc.name,
          subdomain: reqDoc.subdomain,
          communityType: reqDoc.communityType || "college",
          description: reqDoc.description,
          logo: reqDoc.logo,
          website: reqDoc.website,
          primaryLanguage: reqDoc.primaryLanguage || "en",
          country: reqDoc.country,
          cities: reqDoc.cities,
          taxonomy1Title: reqDoc.taxonomy1Title,
          taxonomy1Items: reqDoc.taxonomy1Items || reqDoc.gotras,
          taxonomy2Title: reqDoc.taxonomy2Title,
          taxonomy2Items: reqDoc.taxonomy2Items || reqDoc.kulDevis,
          gotras: reqDoc.gotras,
          kulDevis: reqDoc.kulDevis,
          upiId: reqDoc.upiId,
          modules: reqDoc.modules,
          adminName: reqDoc.adminName || "Community Admin",
          adminEmail: reqDoc.adminEmail || `admin@${reqDoc.subdomain}.com`,
          adminMobile: reqDoc.adminMobile || "",
          adminRole: reqDoc.adminRole || "Admin",
          isActive: true,
        });
      }

      // Provision Community Admin account & activation token
      provisionData = await provisionCommunityAdmin(reqDoc, request);
    }

    return Response.json({
      ...reqDoc.toObject(),
      activationToken: provisionData?.token,
      activationUrl: provisionData?.activationUrl,
      whatsappUrl: provisionData?.whatsappUrl,
    });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const session = verifyAdminSession(request);
  if (!session) {
    return Response.json({ error: "Unauthorized access. Super admin authentication required." }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;
    await CommunityRequest.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
