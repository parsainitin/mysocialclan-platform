import mongoose, { Schema, Document, Model } from "mongoose";
import { getTenantDb } from "@/lib/mongodb";

export interface ITenantUser extends Document {
  subdomain: string;
  name: string;
  email: string;
  mobile: string;
  role: "COMMUNITY_ADMIN" | "MEMBER";
  status: "invited" | "active" | "disabled";
  passwordHash?: string;
  activationToken?: string;
  tokenExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const TenantUserSchema: Schema<ITenantUser> = new Schema(
  {
    subdomain: { type: String, required: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    role: { type: String, enum: ["COMMUNITY_ADMIN", "MEMBER"], default: "COMMUNITY_ADMIN" },
    status: { type: String, enum: ["invited", "active", "disabled"], default: "invited" },
    passwordHash: { type: String },
    activationToken: { type: String, trim: true },
    tokenExpiresAt: { type: Date },
  },
  { timestamps: true, collection: "users" }
);

export const TenantUser: Model<ITenantUser> =
  mongoose.models.TenantUser || mongoose.model<ITenantUser>("TenantUser", TenantUserSchema);

export async function getTenantUserModel(subdomain: string): Promise<Model<ITenantUser>> {
  const tenantDb = await getTenantDb(subdomain);
  return tenantDb.models.User || tenantDb.model<ITenantUser>("User", TenantUserSchema);
}

