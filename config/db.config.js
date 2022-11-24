import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to Mongo! DB: ${db.connections[0].name}`);
  } catch (error) {
    console.error(error);
  }
};
connectDB();
