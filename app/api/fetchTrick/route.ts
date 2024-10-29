import { closeDB, getDB } from "@/app/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await getDB();
    const countsCollection = db.collection("count");
    const result = (await countsCollection.findOne({})) as {
      totalCount: { treatCount: number; trickCount: number };
    };
    const updateResult = await countsCollection.updateOne(
      {},
      { $inc: { "totalCount.trickCount": 1 } }
    );

    console.log(
      updateResult.modifiedCount > 0 && updateResult.acknowledged === true
    );

    if ( updateResult.modifiedCount > 0 && updateResult.acknowledged === true) {
      return NextResponse.json(
        {
          message: "Trick count incremented successfully!",
          ok: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Trick count could not be incremented" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error incrementing trick count:", error);
    return NextResponse.json(
      { error: "An error occurred while incrementing the trick count" },
      { status: 500 }
    );
  }
}
