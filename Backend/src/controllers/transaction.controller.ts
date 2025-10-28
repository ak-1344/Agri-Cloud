import { Request, Response } from "express";
import { Transaction } from "../models/transaction.model";

export const getTransactions = async (_req: Request, res: Response) => {
  const txns = await Transaction.find().populate("listingId farmerId companyId");
  res.json(txns);
};
