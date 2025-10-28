import { Request, Response } from "express";
import { Transaction } from "../models/transaction.model";

export const getTransactions = async (req: Request, res: Response) => {
  const { companyId, farmerId } = req.query as { companyId?: string; farmerId?: string };
  const filter: any = {};
  if (companyId) filter.companyId = companyId;
  if (farmerId) filter.farmerId = farmerId;
  const txns = await Transaction.find(filter).populate("listingId farmerId companyId");
  res.json(txns);
};

export const initiatePayment = async (req: Request, res: Response) => {
  const { listingId, farmerId, companyId, amount, paymentMethod } = req.body;
  if (!listingId || !farmerId || !companyId || !amount || !paymentMethod) {
    return res.status(400).json({ message: "listingId, farmerId, companyId, amount, paymentMethod required" });
  }
  const txn = await Transaction.create({
    listingId,
    farmerId,
    companyId,
    amount,
    paymentMethod,
    paymentStatus: "initiated",
    blockchainTxHash: undefined,
  });
  // Stub: return a mock client secret / intent id
  res.status(201).json({
    transaction: txn,
    paymentIntentId: `pi_${Math.random().toString(36).slice(2, 10)}`,
    clientSecret: `secret_${Math.random().toString(36).slice(2, 10)}`,
  });
};

export const completePayment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const txn = await Transaction.findById(id);
  if (!txn) return res.status(404).json({ message: "Transaction not found" });
  txn.paymentStatus = "completed";
  await txn.save();

  // credit farmer's wallet
  try {
    const { Farmer } = await import("../models/farmer.model");
    const farmer = await Farmer.findById(txn.farmerId);
    if (farmer) {
      farmer.walletBalance = (farmer.walletBalance || 0) + (txn.amount || 0);
      await farmer.save();
    }
  } catch {}

  res.json({ message: "Payment completed", transaction: txn });
};
