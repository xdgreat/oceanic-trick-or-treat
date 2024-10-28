// app/api/fetchTotalTrickOrTreaters/route.ts
import { NextRequest, NextResponse } from "next/server";
import db, { initializeDatabase } from "@/app/libs/db";

initializeDatabase(); 

export async function GET(request: NextRequest) {
  try {
    const result:any = db.prepare("SELECT trick_count, treat_count FROM counts WHERE id = 1").get();
    
    if (result) {
      const totalTrickOrTreaters = result.trick_count + result.treat_count;
      return NextResponse.json({ total: totalTrickOrTreaters });
    } else {
      return NextResponse.json({ error: "Count data not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching total trick or treaters:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
