import express from "express";
import { placeBid, getBids, updateBid, deleteBid, acceptBid, rejectBid } from "../controllers/bid.controller";

const router = express.Router();

router.post("/", placeBid);
router.get("/", getBids);
router.patch("/:id", updateBid);
router.delete("/:id", deleteBid);
router.patch("/:id/accept", acceptBid);
router.patch("/:id/reject", rejectBid);

export default router;
