import mongoose from "mongoose";

declare global {
  var __pacmyproductMongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

const cached = global.__pacmyproductMongoose ?? { conn: null, promise: null };
global.__pacmyproductMongoose = cached;

export async function connectMongoDB() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  cached.promise ??= mongoose.connect(uri, {
    bufferCommands: false,
  });

  cached.conn = await cached.promise;
  return cached.conn;
}
