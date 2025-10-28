import express from "express";
import { getTransactions, initiatePayment, completePayment } from "../controllers/transaction.controller";

const router = express.Router();

router.get("/", getTransactions);
router.post("/initiate", initiatePayment);
router.post("/:id/complete", completePayment);

export default router;
