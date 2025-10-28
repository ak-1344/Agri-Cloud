import express from "express";
import { registerFarmer, loginFarmer, getFarmers } from "../controllers/farmer.controller";

const router = express.Router();

router.post("/register", registerFarmer);
router.post("/login", loginFarmer);
router.get("/", getFarmers);

export default router;
