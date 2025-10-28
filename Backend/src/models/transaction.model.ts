import { Schema, model, Document, Types } from "mongoose";

export interface ITransaction extends Document {
  listingId: Types.ObjectId;
  farmerId: Types.ObjectId;
  companyId: Types.ObjectId;
  amount: number;
  paymentStatus: "initiated" | "completed" | "failed" | "refunded";
  blockchainTxHash?: string;
  paymentMethod: "UPI" | "Card" | "NetBanking" | "Crypto";
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    listingId: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
    farmerId: { type: Schema.Types.ObjectId, ref: "Farmer", required: true },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    amount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["initiated", "completed", "failed", "refunded"],
      default: "initiated",
    },
    blockchainTxHash: String,
    paymentMethod: {
      type: String,
      enum: ["UPI", "Card", "NetBanking", "Crypto"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Transaction = model<ITransaction>("Transaction", transactionSchema);
