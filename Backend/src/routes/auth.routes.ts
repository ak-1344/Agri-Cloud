import express from "express";
import { demoLogin } from "../controllers/auth.controller";

const router = express.Router();

router.post("/demo-login", demoLogin);

export default router;