import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Community } from "@/models/Community";
import { verifyAdminSession } from "@/lib/adminAuth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const session = verifyAdminSession(request);
  if (!session) {
    return Response.json({ error: "Unauthorized access. Super admin authentication required." }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;
    const updates = await request.json();

    const community = await Community.findById(id);
    if (!community) {
      return Response.json({ error: "Community not found" }, { status: 404 });
    }

    if (typeof updates.adminName === "string") community.adminName = updates.adminName;
    if (typeof updates.adminEmail === "string") community.adminEmail = updates.adminEmail;
    if (typeof updates.adminMobile === "string") community.adminMobile = updates.adminMobile;
    if (typeof updates.name === "string") community.name = updates.name;
    if (typeof updates.description === "string") community.description = updates.description;
    if (typeof updates.isActive === "boolean") community.isActive = updates.isActive;

    await community.save();
    return Response.json(community);
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
    await Community.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
