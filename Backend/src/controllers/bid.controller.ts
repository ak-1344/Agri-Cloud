import { Request, Response } from "express";
import { Bid } from "../models/bid.model";
import { Listing } from "../models/listing.model";
import { Transaction } from "../models/transaction.model";

export const placeBid = async (req: Request, res: Response) => {
  try {
    const { listingId, companyId, bidAmount, quantity } = req.body;
    if (!listingId || !companyId || !bidAmount) {
      return res.status(400).json({ message: "listingId, companyId and bidAmount are required" });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    const bid = await Bid.create({ listingId, companyId, bidAmount, quantity });
    listing.bids.push(bid._id);
    await listing.save();

    res.status(201).json(bid);
  } catch (err) {
    res.status(400).json({ message: "Failed to place bid", error: err });
  }
};

export const getBids = async (req: Request, res: Response) => {
  const { listingId, companyId } = req.query as { listingId?: string; companyId?: string };
  const filter: any = {};
  if (listingId) filter.listingId = listingId;
  if (companyId) filter.companyId = companyId;
  const bids = await Bid.find(filter).populate("listingId companyId");
  res.json(bids);
};

export const updateBid = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { bidAmount, quantity } = req.body as { bidAmount?: number; quantity?: number };
  const bid = await Bid.findById(id);
  if (!bid) return res.status(404).json({ message: "Bid not found" });
  if (bid.status !== "pending") return res.status(400).json({ message: "Only pending bids can be updated" });
  if (bidAmount !== undefined) (bid as any).bidAmount = bidAmount;
  if (quantity !== undefined) (bid as any).quantity = quantity;
  await bid.save();
  res.json(bid);
};

export const deleteBid = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bid = await Bid.findById(id);
  if (!bid) return res.status(404).json({ message: "Bid not found" });
  if (bid.status !== "pending") return res.status(400).json({ message: "Only pending bids can be deleted" });
  await bid.deleteOne();
  res.json({ message: "Bid deleted" });
};

export const acceptBid = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bid = await Bid.findById(id);
  if (!bid) return res.status(404).json({ message: "Bid not found" });

  const listing = await Listing.findById(bid.listingId);
  if (!listing) return res.status(404).json({ message: "Listing not found" });

  // mark selected bid accepted, others rejected
  await Bid.updateMany({ listingId: listing._id, _id: { $ne: bid._id } }, { $set: { status: "rejected" } });
  bid.status = "accepted";
  await bid.save();

  // update listing status to pending confirmation
  listing.status = "pending";
  await listing.save();

  // create a transaction record (initiated)
  const amount = (bid.bidAmount || 0) * (bid.quantity || listing.quantity || 1);
  const txn = await Transaction.create({
    listingId: listing._id,
    farmerId: listing.farmerId,
    companyId: bid.companyId,
    amount,
    paymentStatus: "initiated",
    paymentMethod: "UPI",
  });

  res.json({ message: "Bid accepted", bid, transaction: txn });
};

export const rejectBid = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bid = await Bid.findById(id);
  if (!bid) return res.status(404).json({ message: "Bid not found" });
  bid.status = "rejected";
  await bid.save();
  res.json({ message: "Bid rejected", bid });
};
