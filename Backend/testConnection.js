import mongoose from "mongoose";

const uri = "mongodb+srv://ak:1234@agricloud.u8ix5qs.mongodb.net/?appName=AgriCloud";

mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ Connection Error:", err));
