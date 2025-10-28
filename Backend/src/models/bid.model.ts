import { Schema, model, Document, Types } from "mongoose";

export interface IBid extends Document {
  listingId: Types.ObjectId;
  companyId: Types.ObjectId;
  bidAmount: number;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const bidSchema = new Schema<IBid>(
  {
    listingId: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    bidAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Bid = model<IBid>("Bid", bidSchema);
