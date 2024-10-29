import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { closeDB, getDB } from "@/app/libs/db";

export async function GET() {
  try {
    const jokesFilePath = path.join(process.cwd(), "public", "halloween_jokes.json");

    const data = await fs.readFile(jokesFilePath, "utf8");
    const jokes = JSON.parse(data);

    const randomIndex = Math.floor(Math.random() * jokes.length);
    const joke = jokes[randomIndex].joke;

    const db = await getDB();
    const countsCollection = db.collection("count");

    await countsCollection.updateOne(
      { }, 
      { $inc: { "totalCount.treatCount": 1 } }
    );

    return NextResponse.json({
      joke,
      message: "Treat count incremented!",
      ok: true,
    });
  } catch (error) {
    console.error("Error incrementing treat count:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching a joke" },
      { status: 500 }
    );
  } 
}
