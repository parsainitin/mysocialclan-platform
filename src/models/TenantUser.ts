import mongoose, { Schema, Document, Model } from "mongoose";
import { getTenantDb } from "@/lib/mongodb";

export interface ITenantUser extends Document {
  subdomain: string;
  name: string;
  email: string;
  mobile: string;
  phone?: string;
  mobileNumber?: string;
  role: "COMMUNITY_ADMIN" | "admin" | "MEMBER" | "member";
  status: "invited" | "active" | "approved" | "disabled" | "pending" | "rejected";
  password?: string;
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
    phone: { type: String, trim: true },
    mobileNumber: { type: String, trim: true },
    role: { type: String, default: "admin" },
    status: { type: String, default: "approved" },
    password: { type: String },
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


