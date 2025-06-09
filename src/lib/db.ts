import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI!;
  if (!uri) throw new Error("MONGODB_URI not set");

  await mongoose.connect(uri);
  isConnected = true;
}
