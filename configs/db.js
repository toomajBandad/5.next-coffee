import mongoose from "mongoose";

const connectToDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
    return mongoose.connection;
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
    throw err;
  }
};

export default connectToDB;
