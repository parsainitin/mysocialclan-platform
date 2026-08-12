import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICustomCity extends Document {
  countryCode: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomCitySchema: Schema<ICustomCity> = new Schema(
  {
    countryCode: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

CustomCitySchema.index({ countryCode: 1, name: 1 }, { unique: true });

export const CustomCity: Model<ICustomCity> =
  mongoose.models.CustomCity || mongoose.model<ICustomCity>("CustomCity", CustomCitySchema);
