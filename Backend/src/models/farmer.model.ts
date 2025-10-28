import { Schema, model, Document } from "mongoose";

export interface IFarmer extends Document {
  name: string;
  phone: string;
  email?: string;
  password: string;
  aadharNumber: string;
  location: {
    district: string;
    state: string;
    pincode: string;
    coordinates?: { lat: number; lng: number };
  };
  farmSize?: number;
  cropsGrown?: string[];
  verified: boolean;
  walletBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

const farmerSchema = new Schema<IFarmer>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String, required: true },
    aadharNumber: { type: String, required: true, unique: true },
    location: {
      district: String,
      state: String,
      pincode: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    farmSize: Number,
    cropsGrown: [String],
    verified: { type: Boolean, default: false },
    walletBalance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Farmer = model<IFarmer>("Farmer", farmerSchema);
