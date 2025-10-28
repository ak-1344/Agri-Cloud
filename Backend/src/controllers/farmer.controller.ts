import { Request, Response } from "express";
import { Farmer } from "../models/farmer.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerFarmer = async (req: Request, res: Response) => {
  try {
    const farmer = await Farmer.create(req.body);
    res.status(201).json(farmer);
  } catch (err) {
    res.status(400).json({ message: "Failed to register farmer", error: err });
  }
};

export const loginFarmer = async (req: Request, res: Response) => {
  const { phone, password } = req.body;
  const farmer = await Farmer.findOne({ phone });
  if (!farmer || farmer.password !== password)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: farmer._id, role: "farmer" }, process.env.JWT_SECRET!);
  res.json({ token });
};

export const getFarmers = async (_req: Request, res: Response) => {
  const farmers = await Farmer.find();
  res.json(farmers);
};

export const getFarmerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const farmer = await Farmer.findById(id);
  if (!farmer) return res.status(404).json({ message: "Farmer not found" });
  res.json(farmer);
};

export const getFarmerBids = async (req: Request, res: Response) => {
  const { id } = req.params;
  // find listings by this farmer and then bids
  const { Listing } = await import("../models/listing.model");
  const { Bid } = await import("../models/bid.model");
  const listings = await Listing.find({ farmerId: id }, { _id: 1 });
  const listingIds = listings.map((l: any) => l._id);
  const bids = await Bid.find({ listingId: { $in: listingIds } }).populate("listingId companyId");
  res.json(bids);
};
