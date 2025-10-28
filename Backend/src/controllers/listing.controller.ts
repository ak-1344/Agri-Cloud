import { Request, Response } from "express";
import { Listing } from "../models/listing.model";

export const createListing = async (req: Request, res: Response) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ message: "Failed to create listing", error: err });
  }
};

export const getAllListings = async (req: Request, res: Response) => {
  const { q, farmerId } = req.query as { q?: string; farmerId?: string };
  const filter: any = {};
  if (q) {
    filter.$or = [
      { cropName: { $regex: q, $options: "i" } },
      { qualityGrade: { $regex: q, $options: "i" } },
    ];
  }
  if (farmerId) filter.farmerId = farmerId;
  const listings = await Listing.find(filter).populate("farmerId");
  res.json(listings);
};

export const getListingById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate("farmerId bids");
  if (!listing) return res.status(404).json({ message: "Listing not found" });
  res.json(listing);
};

export const updateListing = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const listing = await Listing.findByIdAndUpdate(id, updates, { new: true });
  if (!listing) return res.status(404).json({ message: "Listing not found" });
  res.json(listing);
};

export const deleteListing = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndDelete(id);
  if (!listing) return res.status(404).json({ message: "Listing not found" });
  res.json({ message: "Listing deleted" });
};

export const markSold = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) return res.status(404).json({ message: "Listing not found" });
  listing.status = "pending"; // awaiting buyer verification/payment
  await listing.save();
  res.json({ message: "Listing marked as sold (pending)", listing });
};
