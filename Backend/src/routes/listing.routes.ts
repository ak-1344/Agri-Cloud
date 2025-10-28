import express from "express";
import { createListing, getAllListings } from "../controllers/listing.controller";

const router = express.Router();

router.post("/", createListing);
router.get("/", getAllListings);

export default router;
