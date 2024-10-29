// app/api/fetchTotalTrickOrTreaters/route.ts
import {  NextResponse } from "next/server";
import dotenv from "dotenv";
import { closeDB, getDB } from "@/app/libs/db";
dotenv.config();

type resultType ={
  trick_count: number,
  treat_count: number
}

export async function GET() {

  try {
    const db = await getDB();
  const countsCollection = db.collection("count");

  const result = await countsCollection.findOne({}) as { totalCount: { treatCount: number; trickCount: number } };
    
  if (result && result.totalCount) {
    const totalTrickOrTreaters = result.totalCount.trickCount + result.totalCount.treatCount;
    return NextResponse.json({ total: totalTrickOrTreaters });
  } else {
    console.log( "error heree")
    return NextResponse.json({ error: "Count data not found" }, { status: 404 });
  }
  } catch (error) {
    console.log( "error hereerrr")
    console.error("Error fetching total trick or treaters:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
