import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Community } from "@/models/Community";
import { verifyAdminSession } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  const session = verifyAdminSession(request);
  if (!session) {
    return Response.json({ error: "Unauthorized access. Super admin authentication required." }, { status: 401 });
  }

  try {
    await dbConnect();
    const communities = await Community.find()
      .sort({ createdAt: -1 })
      .lean();
    return Response.json(communities);
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
