import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Community } from "@/models/Community";
import { CommunityRequest } from "@/models/CommunityRequest";
import { verifyAdminSession } from "@/lib/adminAuth";
import { provisionCommunityAdmin } from "@/lib/tenantProvisioner";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const session = verifyAdminSession(request);
  if (!session) {
    return Response.json({ error: "Unauthorized access. Super admin authentication required." }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;

    // Try finding in Community collection first, fallback to CommunityRequest
    let targetDoc: any = await Community.findById(id);
    if (!targetDoc) {
      targetDoc = await CommunityRequest.findById(id);
    }

    if (!targetDoc) {
      return Response.json({ error: "Community or Creation Request record not found" }, { status: 404 });
    }

    // Provision new activation token and URLs for this tenant
    const provisionData = await provisionCommunityAdmin(targetDoc, request);

    return Response.json({
      success: true,
      message: "Onboarding invite link regenerated successfully",
      subdomain: targetDoc.subdomain,
      communityName: targetDoc.name || targetDoc.subdomain,
      adminName: targetDoc.adminName || "Community Admin",
      adminEmail: targetDoc.adminEmail || "",
      adminMobile: targetDoc.adminMobile || "",
      activationToken: provisionData.token,
      activationUrl: provisionData.activationUrl,
      whatsappUrl: provisionData.whatsappUrl,
    });
  } catch (e: any) {
    return Response.json({ error: e.message || "Failed to regenerate invite link" }, { status: 500 });
  }
}
