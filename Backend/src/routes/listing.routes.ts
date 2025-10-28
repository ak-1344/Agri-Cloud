import express from "express";
import { createListing, getAllListings, getListingById, updateListing, deleteListing, markSold } from "../controllers/listing.controller";

const router = express.Router();

router.post("/", createListing);
router.get("/", getAllListings);
router.get("/:id", getListingById);
router.patch("/:id", updateListing);
router.delete("/:id", deleteListing);
router.patch("/:id/mark-sold", markSold);

export default router;
