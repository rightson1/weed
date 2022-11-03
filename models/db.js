import mongoose from "mongoose";

// const MONGO_URL = "mongodb://localhost:27017/weed";
const MONGO_URL =
    "mongodb+srv://Rightson:Rightson@nodeexpressproject.afbca.mongodb.net/Weed?retryWrites=true&w=majority";
if (!MONGO_URL) {
    throw new Error(
        "Please define the MONGO_URL environment variable inside .env.local"
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function db() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = await mongoose
            .connect(MONGO_URL, opts)
            .then((mongoose) => {
                console.log("connected");
                return mongoose;
            });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default db;