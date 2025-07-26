import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxLength: 150,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        dueDate: {
            type: Date,
            required: false,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        tags: [String]
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
