import mongoose from "mongoose";

export default async function connectDB() {
  let isConnected = false;
  if (isConnected) "DB Is Already Connected";
  try {
    let connected = mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error(error);
  }
}
