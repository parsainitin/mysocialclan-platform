import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mysocialclan-platform";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      return m;
    });

  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export function getTenantDbName(subdomain: string): string {
  const cleanSubdomain = (subdomain || "").toLowerCase().trim().replace(/[^a-z0-9_-]/g, "");
  return `comicircle_${cleanSubdomain}`;
}

export async function getTenantDb(subdomain: string) {
  await dbConnect();
  const tenantDbName = getTenantDbName(subdomain);
  return mongoose.connection.useDb(tenantDbName, { useCache: true });
}

