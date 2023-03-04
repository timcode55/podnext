import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const dbClient = await MongoClient.connect(process.env.MONGODB_URI);
  return dbClient;
}
