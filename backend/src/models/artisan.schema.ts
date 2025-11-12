// src/models/artisan.schema.ts
import { Schema, model, Document } from 'mongoose';


export interface IArtisan extends Document {
    fullName: string;
    description: string;
    profilePic: string;
    slug: string;
    status: string;
}


const artisanSchema = new Schema<IArtisan>(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        profilePic: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        status: {
            type: String,
            required: true,
            default: 'active',
        },
    },
    {
        timestamps: true,
    }
);


export default model<IArtisan>('Artisan', artisanSchema);
