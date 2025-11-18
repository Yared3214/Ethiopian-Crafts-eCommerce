// src/models/user.schema.ts
import mongoose, { Schema, model, Document } from 'mongoose';



export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    status: string;
    fcmToken?: string;
    savedProducts: mongoose.Types.ObjectId[];
    phone?: string;
    address?: {
        country: string;
        city: string;
        subcity: string;
    }
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
    status: {
        type: String,
        required: true,
        default: 'active'
    },
    savedProducts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // references Product model
        },
      ],
    phone: {
        type: String,
    },
    fcmToken: {
        type: String,
    },
    address: {
        country: {
            type: String,
        },
        city: {
            type: String,
        },
        subcity: {
            type: String,
        }
    }
}, { timestamps: true });

export default model<IUser>('User', userSchema);
