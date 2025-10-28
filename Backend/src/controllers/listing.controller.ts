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

export const getAllListings = async (_req: Request, res: Response) => {
  const listings = await Listing.find().populate("farmerId");
  res.json(listings);
};
