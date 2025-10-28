import { Request, Response } from "express";
import { Company } from "../models/company.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerCompany = async (req: Request, res: Response) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({ message: "Failed to register company", error: err });
  }
};

export const loginCompany = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const company = await Company.findOne({ email });
  if (!company || company.password !== password)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: company._id, role: "company" }, process.env.JWT_SECRET!);
  res.json({ token });
};

export const getCompanies = async (_req: Request, res: Response) => {
  const companies = await Company.find();
  res.json(companies);
};
