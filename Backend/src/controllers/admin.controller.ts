import { Request, Response } from "express";
import { Farmer } from "../models/farmer.model";
import { Company } from "../models/company.model";

export const getDashboardStats = async (_req: Request, res: Response) => {
  const farmers = await Farmer.countDocuments();
  const companies = await Company.countDocuments();
  res.json({ farmers, companies });
};
