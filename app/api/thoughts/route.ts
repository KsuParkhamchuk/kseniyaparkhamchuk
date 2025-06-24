import dbConnect from "@/db/connect";
import Thought from "@/db/thoughts";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();

    try {
        const thoughts = await Thought.find();
        return NextResponse.json(thoughts);
    } catch(error){
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
