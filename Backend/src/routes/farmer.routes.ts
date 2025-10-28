import express from "express";
import { registerFarmer, loginFarmer, getFarmers, getFarmerById, getFarmerBids } from "../controllers/farmer.controller";

const router = express.Router();

router.post("/register", registerFarmer);
router.post("/login", loginFarmer);
router.get("/", getFarmers);
router.get("/:id", getFarmerById);
router.get("/:id/bids", getFarmerBids);

export default router;
