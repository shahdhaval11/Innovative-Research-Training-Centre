import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Reused across hot reloads in dev so `next dev` doesn't open a new
// connection pool on every module reload.
function getClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri as string).connect();
    }
    return global._mongoClientPromise;
  }
  return new MongoClient(uri as string).connect();
}

const clientPromise = getClientPromise();

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}
