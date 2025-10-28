import express from "express";
import { placeBid, getBids } from "../controllers/bid.controller";

const router = express.Router();

router.post("/", placeBid);
router.get("/", getBids);

export default router;
