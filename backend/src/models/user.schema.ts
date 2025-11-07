// src/models/user.schema.ts
import mongoose, { Schema, model, Document } from 'mongoose';



export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    savedProducts: mongoose.Types.ObjectId[];
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
    savedProducts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // references Product model
        },
      ],
}, { timestamps: true });

export default model<IUser>('User', userSchema);
