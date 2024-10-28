import { NextRequest, NextResponse } from "next/server";
import db, { initializeDatabase } from "@/app/libs/db";
import { promises as fs } from 'fs';
import path from 'path';

initializeDatabase();

export async function GET(request: NextRequest) {
  try {
    // Define the path to the JSON file
    const jokesFilePath = path.join(process.cwd(), 'public', 'halloween_jokes.json');
    
    // Read the jokes JSON file
    const data = await fs.readFile(jokesFilePath, 'utf8');
    const jokes = JSON.parse(data);

    // Select a random joke
    const randomIndex = Math.floor(Math.random() * jokes.length);
    const joke = jokes[randomIndex].joke;

    // Increment the treat count in the database
    db.prepare('UPDATE counts SET treat_count = treat_count + 1 WHERE id = 1').run();

    return NextResponse.json({
      joke,
      message: "Treat count incremented!",
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while fetching a joke",
    }, { status: 500 });
  }
}
