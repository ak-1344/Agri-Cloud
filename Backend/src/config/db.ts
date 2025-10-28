import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PRIMARY_URI = process.env.MONGO_URI;
const FALLBACK_URI = "mongodb://127.0.0.1:27017/agricloud";

export const connectDB = async (): Promise<void> => {
  const tryConnect = async (uri: string) => {
    await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${uri.startsWith("mongodb+srv") ? "Atlas" : uri}`);
  };

  try {
    if (PRIMARY_URI) {
      await tryConnect(PRIMARY_URI);
      return;
    }
    await tryConnect(FALLBACK_URI);
  } catch (err: any) {
    console.error("❌ MongoDB Connection Error:", err?.message || err);
    if (PRIMARY_URI && FALLBACK_URI) {
      console.warn("⚠️ Retrying with local fallback...");
      try {
        await tryConnect(FALLBACK_URI);
        return;
      } catch (e: any) {
        console.error("❌ Fallback connection failed:", e?.message || e);
      }
    }
    process.exit(1);
  }
};
