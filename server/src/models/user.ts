import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    email: string
    firstName: string
    lastName: string
    passwordHash: string
    createdAt: Date
    updatedAt: Date
}

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address"
            ]
        },
        passwordHash: {
            type: String,
            required: true,
            minlength: 8
        },
    },
    {
        timestamps: true,
    }
);

export const User = model<IUser>("User", userSchema);