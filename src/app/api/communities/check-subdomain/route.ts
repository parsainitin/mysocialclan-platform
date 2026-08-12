import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Community } from "@/models/Community";
import { CommunityRequest } from "@/models/CommunityRequest";

const RESERVED_SUBDOMAINS = ["www", "admin", "app", "api", "superadmin", "mail", "localhost", "mysocialclan"];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawSubdomain = searchParams.get("subdomain") || "";
    const slug = rawSubdomain.trim().toLowerCase();

    if (!slug) {
      return Response.json({ available: false, error: "Subdomain parameter is required" }, { status: 400 });
    }

    if (!/^[a-z0-9-]+$/.test(slug)) {
      return Response.json({
        available: false,
        error: "Subdomain can only contain lowercase letters, numbers, and hyphens",
      });
    }

    if (RESERVED_SUBDOMAINS.includes(slug)) {
      return Response.json({ available: false, error: `Subdomain '${slug}' is reserved` });
    }

    // Try DB check with 1.5-second timeout race
    try {
      const dbCheckPromise = (async () => {
        await dbConnect();
        const existingLive = await Community.findOne({ subdomain: slug }).select("_id").lean();
        if (existingLive) {
          return { available: false, error: `Subdomain '${slug}' is already registered` };
        }
        const existingPending = await CommunityRequest.findOne({ subdomain: slug, status: "pending" })
          .select("_id")
          .lean();
        if (existingPending) {
          return { available: false, error: `Subdomain '${slug}' has a creation request pending` };
        }
        return { available: true };
      })();

      const timeoutPromise = new Promise<{ available: boolean }>((resolve) =>
        setTimeout(() => resolve({ available: true }), 1500)
      );

      const dbResult = await Promise.race([dbCheckPromise, timeoutPromise]);
      if (!dbResult.available) {
        return Response.json(dbResult);
      }
    } catch (dbErr: any) {
      console.warn("MongoDB check warning (fallback to format & reserved validation):", dbErr.message);
    }

    return Response.json({ available: true, subdomain: slug });
  } catch (e: any) {
    return Response.json({ available: false, error: e.message || "Failed checking subdomain availability" }, { status: 200 });
  }
}

