import express from "express";
import cors from "cors";
import farmerRoutes from "./routes/farmer.routes";
import companyRoutes from "./routes/company.routes";
import listingRoutes from "./routes/listing.routes";
import bidRoutes from "./routes/bid.routes";
import transactionRoutes from "./routes/transaction.routes";
import adminRoutes from "./routes/admin.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/farmers", farmerRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

export default app;
