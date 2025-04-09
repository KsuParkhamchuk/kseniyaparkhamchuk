import { NextResponse } from "next/server";
import dbConnect from "@/db/connect";
import Note from "@/db/model";

export async function GET() {
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Connected to database");

    try {
        const notes = await Note.find();
        return NextResponse.json(notes);
    } catch(error){
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}