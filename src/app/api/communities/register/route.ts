import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Community } from "@/models/Community";
import { CommunityRequest } from "@/models/CommunityRequest";
import { CustomCity } from "@/models/CustomCity";

const RESERVED_SUBDOMAINS = ["www", "admin", "app", "api", "superadmin", "mail", "localhost", "mysocialclan"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const {
      name,
      subdomain,
      description,
      logo,
      primaryLanguage,
      country,
      cities,
      gotras,
      kulDevis,
      upiId,
      modules,
      adminName,
      adminEmail,
      adminMobile,
    } = body;

    // 1. Validate Community & Admin input details BEFORE attempting DB connection
    if (!name?.trim() || !subdomain?.trim()) {
      return Response.json({ error: "Community Name and Subdomain are required" }, { status: 400 });
    }

    const slug = subdomain.trim().toLowerCase();
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return Response.json(
        { error: "Subdomain can only contain lowercase letters, numbers, and hyphens" },
        { status: 400 }
      );
    }

    if (RESERVED_SUBDOMAINS.includes(slug)) {
      return Response.json({ error: `Subdomain '${slug}' is reserved` }, { status: 400 });
    }

    if (!adminName?.trim() || !adminEmail?.trim() || !adminMobile?.trim()) {
      return Response.json(
        { error: "Admin Name, Contact Email, and Contact Mobile Number are required" },
        { status: 400 }
      );
    }

    const cleanEmail = adminEmail.trim().toLowerCase();
    const cleanMobile = adminMobile.trim();
    const parsedCities = Array.isArray(cities) ? cities.map((c: string) => c.trim()).filter(Boolean) : [];

    // 2. Perform DB operations with an 8-second timeout race to prevent 504 Gateway Timeouts
    const dbTask = (async () => {
      await dbConnect();

      // Check if subdomain exists in live communities or pending requests
      const existingCommunity = await Community.findOne({ subdomain: slug });
      if (existingCommunity) {
        return { status: 409, error: `Subdomain '${slug}' is already taken` };
      }

      const existingPending = await CommunityRequest.findOne({ subdomain: slug, status: "pending" });
      if (existingPending) {
        return {
          status: 409,
          error: `A creation request for subdomain '${slug}' is already pending review`,
        };
      }

      // Save custom cities globally for future community creators
      if (parsedCities.length > 0) {
        const countryCode = (country || "IN").toLowerCase().trim();
        for (const cityName of parsedCities) {
          try {
            await CustomCity.updateOne(
              { countryCode, name: cityName },
              { $setOnInsert: { countryCode, name: cityName } },
              { upsert: true }
            );
          } catch {}
        }
      }

      // Create Community Request for offline provisioning
      const creationRequest = await CommunityRequest.create({
        name: name.trim(),
        subdomain: slug,
        description: description?.trim() || undefined,
        logo: logo?.trim() || undefined,
        primaryLanguage: primaryLanguage?.trim() || "en",
        country: country?.trim() || undefined,
        cities: parsedCities,

        gotras: Array.isArray(gotras) ? gotras.map((g: string) => g.trim()).filter(Boolean) : [],
        kulDevis: Array.isArray(kulDevis) ? kulDevis.map((k: string) => k.trim()).filter(Boolean) : [],
        upiId: upiId?.trim() || undefined,
        modules: {
          directory: modules?.directory ?? true,
          marketplace: modules?.marketplace ?? true,
          panchang: modules?.panchang ?? true,
          booking: modules?.booking ?? true,
          events: modules?.events ?? true,
          donations: modules?.donations ?? true,
        },
        adminName: adminName.trim(),
        adminEmail: cleanEmail,
        adminMobile: cleanMobile,
        status: "pending",
      });

      return {
        status: 202,
        data: {
          success: true,
          pendingApproval: true,
          message: "Community setup request submitted for offline provisioning",
          request: {
            id: creationRequest._id,
            name: creationRequest.name,
            subdomain: creationRequest.subdomain,
            primaryLanguage: creationRequest.primaryLanguage,
            adminName: creationRequest.adminName,
            adminEmail: creationRequest.adminEmail,
            adminMobile: creationRequest.adminMobile,
          },
        },
      };
    })();

    const timeoutTask = new Promise<{ status: number; error?: string; data?: any }>((resolve) =>
      setTimeout(
        () =>
          resolve({
            status: 503,
            error: "Database connection timed out in production. Please check: 1) Is MONGODB_URI set in your production environment variables? 2) Is 0.0.0.0/0 allowed in MongoDB Atlas Network Access?",
          }),
        8000
      )
    );


    const result: { status: number; error?: string; data?: any } = await Promise.race([dbTask, timeoutTask]);

    if (result.error) {
      return Response.json({ error: result.error }, { status: result.status });
    }

    return Response.json(result.data, { status: result.status });

  } catch (e: any) {
    return Response.json({ error: e.message || "Failed to submit community request" }, { status: 500 });
  }
}

