import mongoose from "mongoose";

export async function connectDB() {
  try {
    const connUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/chalcedony";
    console.log(`Connecting to MongoDB...`);
    const conn = await mongoose.connect(connUri);
    console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn("Server will continue running. Please verify your MONGODB_URI in server/.env");
    return null;
  }
}
