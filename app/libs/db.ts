import { ServerApiVersion } from "mongodb";
const MongoClient = require("mongodb").MongoClient;
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const uri = process.env.MONGODB_CONNECTION;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

console.log(process.env.MONGODB_CONNECTION)
export async function connectDB() {
  const client = MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export function getDB() {
  return client.db("OceanicTrickOrTreat");
}

export async function closeDB() {
  await client.close();
  console.log("MongoDB connection closed");
}

export async function run() {
  try {
    await client.connect();
    client.db("OceanicTrickOrTreat");
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
}