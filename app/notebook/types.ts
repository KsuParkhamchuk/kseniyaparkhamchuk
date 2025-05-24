import { ObjectId } from "mongodb";

export type Part = {
    number: number;
    title: string;
    content: string;
}

export type Note = {
    _id: ObjectId;
    title: string;
    imagePath: string;
    description: string;
    parts?: Part[];
    content?: string;
    createdAt?: Date;
}