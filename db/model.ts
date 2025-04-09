import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    imagePath: String,
    createdAt: { type: Date, default: Date.now },
    parts: [
        {
            number: Number,
            title: String,
            content: String,
        }
    ]
});

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default Note;