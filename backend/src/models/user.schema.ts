// src/models/user.schema.ts
import { Schema, model, Document } from 'mongoose';



export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
}

const userSchema = new Schema<IUser>({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
}, { timestamps: true });

export default model<IUser>('User', userSchema);
