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

    if (typeof updates.name === "string" && updates.name.trim()) {
      community.name = updates.name.trim();
    }
    if (typeof updates.subdomain === "string" && updates.subdomain.trim()) {
      const cleanSub = updates.subdomain.trim().toLowerCase();
      if (cleanSub !== community.subdomain) {
        const existing = await Community.findOne({ subdomain: cleanSub, _id: { $ne: id } });
        if (existing) {
          return Response.json({ error: `Subdomain '${cleanSub}' is already taken by another community` }, { status: 409 });
        }
        community.subdomain = cleanSub;
      }
    }
    if (typeof updates.communityType === "string") community.communityType = updates.communityType.trim();
    if (typeof updates.logo === "string") community.logo = updates.logo.trim();
    if (typeof updates.website === "string") community.website = updates.website.trim();
    if (typeof updates.description === "string") community.description = updates.description.trim();
    if (typeof updates.primaryLanguage === "string") community.primaryLanguage = updates.primaryLanguage.trim();
    if (typeof updates.country === "string") community.country = updates.country.trim();
    if (Array.isArray(updates.cities)) {
      community.cities = updates.cities.map((c: string) => c.trim()).filter(Boolean);
    }
    
    if (typeof updates.taxonomy1Title === "string") community.taxonomy1Title = updates.taxonomy1Title.trim();
    if (Array.isArray(updates.taxonomy1Items)) {
      community.taxonomy1Items = updates.taxonomy1Items.map((g: string) => g.trim()).filter(Boolean);
      community.gotras = community.taxonomy1Items;
    } else if (Array.isArray(updates.gotras)) {
      community.gotras = updates.gotras.map((g: string) => g.trim()).filter(Boolean);
      community.taxonomy1Items = community.gotras;
    }

    if (typeof updates.taxonomy2Title === "string") community.taxonomy2Title = updates.taxonomy2Title.trim();
    if (Array.isArray(updates.taxonomy2Items)) {
      community.taxonomy2Items = updates.taxonomy2Items.map((k: string) => k.trim()).filter(Boolean);
      community.kulDevis = community.taxonomy2Items;
    } else if (Array.isArray(updates.kulDevis)) {
      community.kulDevis = updates.kulDevis.map((k: string) => k.trim()).filter(Boolean);
      community.taxonomy2Items = community.kulDevis;
    }

    if (typeof updates.upiId === "string") community.upiId = updates.upiId.trim();

    if (typeof updates.adminName === "string") community.adminName = updates.adminName.trim();
    if (typeof updates.adminEmail === "string") community.adminEmail = updates.adminEmail.trim().toLowerCase();
    if (typeof updates.adminMobile === "string") community.adminMobile = updates.adminMobile.trim();
    if (typeof updates.adminRole === "string") community.adminRole = updates.adminRole.trim();

    if (updates.modules && typeof updates.modules === "object") {
      const opps = updates.modules.opportunities ?? updates.modules.marketplace ?? true;
      const cal = updates.modules.calendar ?? updates.modules.panchang ?? true;
      community.modules = {
        directory: !!updates.modules.directory,
        opportunities: !!opps,
        calendar: !!cal,
        booking: !!updates.modules.booking,
        events: !!updates.modules.events,
        donations: !!updates.modules.donations,
        marketplace: !!opps,
        panchang: !!updates.modules.panchang,
      };
    }

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
