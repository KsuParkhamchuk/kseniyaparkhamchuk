import mongoose from "mongoose";

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // var in a global declaration corresponds to properties on the global object
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache | undefined;
}

const CONNECTION_STRING = process.env.MONGODB_URI;

if (!CONNECTION_STRING) {
    throw new Error("MONGODB_URI is not defined");
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

export default async function dbConnect() {

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise && CONNECTION_STRING) {
        cached.promise = mongoose.connect(CONNECTION_STRING).then((mongoose) => {
            return mongoose;
        });
    }
    
    cached.conn = await cached.promise;
    console.log("Connected to MongoDB");
    return cached.conn;
    
}
