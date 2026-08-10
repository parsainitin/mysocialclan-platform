import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { CommunityRequest } from "@/models/CommunityRequest";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const requests = await CommunityRequest.find()
      .sort({ createdAt: -1 })
      .lean();
    return Response.json(requests);
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
