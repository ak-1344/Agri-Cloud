import { Schema, model, Document } from "mongoose";

export interface ICompany extends Document {
  companyName: string;
  email: string;
  phone: string;
  password: string;
  gstNumber: string;
  businessType: "Retailer" | "Wholesaler" | "Exporter" | "Processor";
  address: {
    city: string;
    state: string;
    pincode: string;
  };
  verified: boolean;
  subscriptionTier: "Free" | "Premium" | "Business" | "Enterprise";
  createdAt: Date;
  updatedAt: Date;
}

const companySchema = new Schema<ICompany>(
  {
    companyName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    gstNumber: { type: String, required: true },
    businessType: {
      type: String,
      enum: ["Retailer", "Wholesaler", "Exporter", "Processor"],
      required: true,
    },
    address: {
      city: String,
      state: String,
      pincode: String,
    },
    verified: { type: Boolean, default: false },
    subscriptionTier: {
      type: String,
      enum: ["Free", "Premium", "Business", "Enterprise"],
      default: "Free",
    },
  },
  { timestamps: true }
);

export const Company = model<ICompany>("Company", companySchema);
