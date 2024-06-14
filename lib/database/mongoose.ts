import { error } from "console";
import mongoose, { Mongoose } from "mongoose";

const MONBODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONBODB_URL) throw new Error("Missing_MONGODB_URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONBODB_URL, { dbName: "Gimage", bufferCommands: false });

  cached.conn = await cached.promise;

  return cached.conn;
};
