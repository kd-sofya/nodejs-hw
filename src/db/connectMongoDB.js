import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
  } catch (error) {
      console.error(error.message);
      process.exit(1);
  }
}
