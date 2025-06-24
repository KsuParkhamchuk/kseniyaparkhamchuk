import mongoose from "mongoose";

const thoughtSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    imagePath: String,
    createdAt: { type: Date, default: Date.now },
});

const Thought = mongoose.models.Thought || mongoose.model("Thought", thoughtSchema);

export default Thought;
