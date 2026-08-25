import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICommunityRequest extends Document {
  name: string;
  subdomain: string;
  communityType?: "college" | "alumni" | "cultural" | "industry" | "ngo" | "custom" | string;
  description?: string;
  logo?: string;
  website?: string;
  primaryLanguage?: string;
  country?: string;
  cities?: string[];
  
  // Modular dynamic taxonomies
  taxonomy1Title?: string;
  taxonomy1Items?: string[];
  taxonomy2Title?: string;
  taxonomy2Items?: string[];

  // Legacy taxonomy support
  gotras?: string[];
  kulDevis?: string[];

  upiId?: string;
  modules?: {
    directory?: boolean;
    opportunities?: boolean;
    calendar?: boolean;
    booking?: boolean;
    events?: boolean;
    donations?: boolean;
    marketplace?: boolean;
    panchang?: boolean;
  };
  adminName: string;
  adminEmail: string;
  adminMobile: string;
  adminRole?: string;
  termsAccepted?: boolean;
  termsAcceptedAt?: Date;
  status: "pending" | "approved" | "rejected";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommunityRequestSchema: Schema<ICommunityRequest> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    subdomain: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    communityType: { type: String, default: "college", trim: true },
    description: { type: String, trim: true },
    logo: { type: String, trim: true },
    website: { type: String, trim: true },
    primaryLanguage: { type: String, default: "en", trim: true },
    country: { type: String, trim: true },
    cities: [{ type: String, trim: true }],

    taxonomy1Title: { type: String, trim: true },
    taxonomy1Items: [{ type: String, trim: true }],
    taxonomy2Title: { type: String, trim: true },
    taxonomy2Items: [{ type: String, trim: true }],

    gotras: [{ type: String, trim: true }],
    kulDevis: [{ type: String, trim: true }],

    upiId: { type: String, trim: true },
    modules: {
      directory: { type: Boolean, default: true },
      opportunities: { type: Boolean, default: true },
      calendar: { type: Boolean, default: true },
      booking: { type: Boolean, default: true },
      events: { type: Boolean, default: true },
      donations: { type: Boolean, default: true },
      marketplace: { type: Boolean, default: true },
      panchang: { type: Boolean, default: false },
    },
    adminName: { type: String, required: true, trim: true },
    adminEmail: { type: String, required: true, trim: true, lowercase: true },
    adminMobile: { type: String, required: true, trim: true },
    adminRole: { type: String, trim: true },
    termsAccepted: { type: Boolean, default: false },
    termsAcceptedAt: { type: Date },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

export const CommunityRequest: Model<ICommunityRequest> =
  mongoose.models.CommunityRequest ||
  mongoose.model<ICommunityRequest>("CommunityRequest", CommunityRequestSchema);
