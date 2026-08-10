import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Community } from "@/models/Community";
import { CommunityRequest } from "@/models/CommunityRequest";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;
    const { status, notes, provisionNow } = await request.json();

    const reqDoc = await CommunityRequest.findById(id);
    if (!reqDoc) {
      return Response.json({ error: "Creation request not found" }, { status: 404 });
    }

    if (status) reqDoc.status = status;
    if (notes) reqDoc.notes = notes;
    await reqDoc.save();

    // If provisionNow is true, also register Community record for live showcase
    if (provisionNow && status === "approved") {
      const existingCommunity = await Community.findOne({ subdomain: reqDoc.subdomain });
      if (!existingCommunity) {
        await Community.create({
          name: reqDoc.name,
          subdomain: reqDoc.subdomain,
          description: reqDoc.description,
          logo: reqDoc.logo,
          cities: reqDoc.cities,
          gotras: reqDoc.gotras,
          kulDevis: reqDoc.kulDevis,
          upiId: reqDoc.upiId,
          modules: reqDoc.modules,
          adminMobile: reqDoc.adminMobile,
          isActive: true,
        });
      }
    }

    return Response.json(reqDoc);
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;
    await CommunityRequest.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
