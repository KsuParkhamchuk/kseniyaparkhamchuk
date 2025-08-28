import dbConnect from "@/db/connect";
import Thought from "@/db/thoughts";
import { Thought as ThoughtType } from "./types";
import mongoose from "mongoose";

export const getThoughts = async (): Promise<ThoughtType[]> => {
  await dbConnect();

  try {
    const thoughts = await Thought.find().lean();
    return JSON.parse(JSON.stringify(thoughts));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getThoughtById = async (
  id: string
): Promise<ThoughtType | null> => {
  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  try {
    const thought = await Thought.findById(id).lean();

    if (!thought) {
      return null;
    }
    return JSON.parse(JSON.stringify(thought));
  } catch (e) {
    console.error("Database error while fetching the data", e);
    throw new Error("Failed to retrieve thought from database");
  }
};
