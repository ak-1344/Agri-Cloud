import express from "express";
import { registerCompany, loginCompany, getCompanies } from "../controllers/company.controller";

const router = express.Router();

router.post("/register", registerCompany);
router.post("/login", loginCompany);
router.get("/", getCompanies);

export default router;
