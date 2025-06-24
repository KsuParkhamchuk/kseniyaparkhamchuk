import { ObjectId } from "mongodb"

export type Thought = {
    _id: ObjectId;
    title: string;
    imagePath: string;
    description: string;
    content?: string;
    createdAt?: Date;
}