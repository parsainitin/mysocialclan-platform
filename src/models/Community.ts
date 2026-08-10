import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICommunity extends Document {
  name: string;
  subdomain: string;
  description?: string;
  logo?: string;
  primaryLanguage?: string;
  cities?: string[];
  gotras?: string[];
  kulDevis?: string[];
  upiId?: string;
  modules?: {
    directory?: boolean;
    marketplace?: boolean;
    panchang?: boolean;
    booking?: boolean;
    events?: boolean;
    donations?: boolean;
  };
  adminName?: string;
  adminEmail?: string;
  adminMobile?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommunitySchema: Schema<ICommunity> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    subdomain: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: { type: String, trim: true },
    logo: { type: String, trim: true },
    primaryLanguage: { type: String, default: "en", trim: true },
    cities: [{ type: String, trim: true }],
    gotras: [{ type: String, trim: true }],
    kulDevis: [{ type: String, trim: true }],
    upiId: { type: String, trim: true },
    modules: {
      directory: { type: Boolean, default: true },
      marketplace: { type: Boolean, default: true },
      panchang: { type: Boolean, default: true },
      booking: { type: Boolean, default: true },
      events: { type: Boolean, default: true },
      donations: { type: Boolean, default: true },
    },
    adminName: { type: String, trim: true },
    adminEmail: { type: String, trim: true, lowercase: true },
    adminMobile: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Community: Model<ICommunity> =
  mongoose.models.Community || mongoose.model<ICommunity>("Community", CommunitySchema);
