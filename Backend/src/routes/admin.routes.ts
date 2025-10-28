import express from "express";
import { getDashboardStats } from "../controllers/admin.controller";

const router = express.Router();

router.get("/stats", getDashboardStats);

export default router;
