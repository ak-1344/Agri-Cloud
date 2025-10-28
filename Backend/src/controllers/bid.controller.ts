import { Request, Response } from "express";
import { Bid } from "../models/bid.model";

export const placeBid = async (req: Request, res: Response) => {
  try {
    const bid = await Bid.create(req.body);
    res.status(201).json(bid);
  } catch (err) {
    res.status(400).json({ message: "Failed to place bid", error: err });
  }
};

export const getBids = async (_req: Request, res: Response) => {
  const bids = await Bid.find().populate("listingId companyId");
  res.json(bids);
};
