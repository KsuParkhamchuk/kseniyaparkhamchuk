import dbConnect from "@/db/connect";
import Note from "@/db/model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    
    const paramsData = await params;
    dbConnect();

    const res = await Note.find({_id: new mongoose.Types.ObjectId(paramsData.id)});
    return NextResponse.json(res);
}