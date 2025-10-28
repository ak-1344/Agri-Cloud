import { Schema, model, Document, Types } from "mongoose";

export interface IListing extends Document {
  farmerId: Types.ObjectId;
  cropName: string;
  variety?: string;
  quantity: number; // in kg/ton
  unit: "kg" | "quintal" | "ton";
  qualityGrade: "A" | "B" | "C";
  pricePerUnit: number;
  status: "available" | "sold" | "pending";
  harvestDate: Date;
  images?: string[];
  preferredSellingMethod: "auction" | "fixed" | "negotiation";
  storageConditions?: string;
  organicCertified?: boolean;
  bids: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const listingSchema = new Schema<IListing>(
  {
    farmerId: { type: Schema.Types.ObjectId, ref: "Farmer", required: true },
    cropName: { type: String, required: true },
    variety: String,
    quantity: { type: Number, required: true },
    unit: { type: String, enum: ["kg", "quintal", "ton"], default: "kg" },
    qualityGrade: { type: String, enum: ["A", "B", "C"], required: true },
    pricePerUnit: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "sold", "pending"],
      default: "available",
    },
    harvestDate: { type: Date },
    images: [String],
    preferredSellingMethod: {
      type: String,
      enum: ["auction", "fixed", "negotiation"],
      default: "fixed",
    },
    storageConditions: String,
    organicCertified: { type: Boolean, default: false },
    bids: [{ type: Schema.Types.ObjectId, ref: "Bid" }],
  },
  { timestamps: true }
);

export const Listing = model<IListing>("Listing", listingSchema);
