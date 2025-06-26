import dbConnect from "@/db/connect";
import Note from "@/db/model";
import mongoose from "mongoose";
import { Note as NoteType } from "./types";

export async function getNotes(): Promise<NoteType[]> {
    await dbConnect();
    try {
        const notes = await Note.find().lean();
        return JSON.parse(JSON.stringify(notes)) as NoteType[];
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error('Failed to fetch notes.');
    }
}

export async function getNoteById(id: string): Promise<NoteType | null> {
    await dbConnect();
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        const note = await Note.findById(id).lean();
        if (!note) {
            return null;
        }
        return JSON.parse(JSON.stringify(note)) as NoteType;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error('Failed to fetch note.');
    }
}
