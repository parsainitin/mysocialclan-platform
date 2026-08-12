import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { CustomCity } from "@/models/CustomCity";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const country = (searchParams.get("country") || "in").trim().toLowerCase();

    await dbConnect();
    const customCities = await CustomCity.find({ countryCode: country })
      .select("name")
      .lean();

    const cityNames = customCities.map((c) => c.name);
    return Response.json({ success: true, country, cities: cityNames });
  } catch (e: any) {
    return Response.json({ error: e.message || "Failed to fetch custom cities" }, { status: 500 });
  }
}
