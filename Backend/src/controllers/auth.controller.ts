import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Farmer } from "../models/farmer.model";
import { Company } from "../models/company.model";

dotenv.config();

export const demoLogin = async (req: Request, res: Response) => {
  const { role, email, name, phone } = req.body as {
    role: "farmer" | "company";
    email?: string;
    name?: string;
    phone?: string;
  };
  try {
    if (role === "farmer") {
      let farmer = await Farmer.findOne({ phone });
      if (!farmer) {
        farmer = await Farmer.create({
          name: name || "Demo Farmer",
          phone: phone || `9${Math.floor(Math.random() * 1e9)}`,
          password: "demo",
          aadharNumber: `${Math.floor(Math.random() * 1e12)}`,
          location: { district: "", state: "", pincode: "" },
          verified: true,
        } as any);
      }
      const token = jwt.sign({ id: farmer._id, role: "farmer" }, process.env.JWT_SECRET!);
      return res.json({ token, user: { id: farmer._id, name: farmer.name, userType: "farmer" } });
    }
    if (role === "company") {
      let company = await Company.findOne({ email });
      if (!company) {
        company = await Company.create({
          companyName: name || "Demo Company",
          email: email || `demo${Math.random().toString(36).slice(2, 6)}@example.com`,
          phone: phone || `8${Math.floor(Math.random() * 1e9)}`,
          password: "demo",
          gstNumber: `GST${Math.floor(Math.random() * 1e8)}`,
          businessType: "Wholesaler",
          address: { city: "", state: "", pincode: "" },
          verified: true,
          subscriptionTier: "Free",
        } as any);
      }
      const token = jwt.sign({ id: company._id, role: "company" }, process.env.JWT_SECRET!);
      return res.json({ token, user: { id: company._id, name: company.companyName, userType: "company" } });
    }
    return res.status(400).json({ message: "Invalid role" });
  } catch (err) {
    res.status(500).json({ message: "Demo login failed", error: err });
  }
};