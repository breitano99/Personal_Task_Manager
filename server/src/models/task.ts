import {Schema, model, Document, Types} from "mongoose";

export type TaskStatus = "todo" | "in-progress" | "done" | "postponed"

export interface ITask extends Document {
    title: string
    description?: string
    status: TaskStatus
    user: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String
        },
        status: {
            type: String,
            enum: ["todo", "in-progress", "done", "postponed"],
            default: "todo"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true,
    }
);

//index to improve performance. user ascending, createdAt descending
taskSchema.index( {user:1, createdAt: -1});

export const Task = model<ITask>("Task", taskSchema);