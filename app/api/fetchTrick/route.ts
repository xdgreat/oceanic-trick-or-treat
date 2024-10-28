import { NextRequest, NextResponse } from "next/server";
import db, { initializeDatabase } from "@/app/libs/db";

initializeDatabase();

export async function GET(request: NextRequest) {
  try {
    // Increment the trick count in the database
    db.prepare('UPDATE counts SET trick_count = trick_count + 1 WHERE id = 1').run();

    // Respond with a success message
    return NextResponse.json({
      message: "Trick count incremented successfully!",
      ok: true,
    }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while incrementing the trick count",
    }, { status: 500 });
  }
}
