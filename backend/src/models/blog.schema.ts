// src/models/blog.schema.ts
import { Schema, model, Document } from 'mongoose';

// Interface for the Blog document
export interface IBlog extends Document {
    title: string;
    slug: string;
    description: string[];
    images: string[];
    badges: string[];
    category: string; // Added category field
}

// Mongoose schema definition for Blog
const blogSchema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: [
            {
                type: String,
                required: true,
                trim: true,
            },
        ], // Array of descriptions
        images: [
            {
                type: String,
                required: true,
            }
        ], // Array of image URLs
        badges: [
            {
                type: String,
                trim: true,
            },
        ], // Array of badges (tags)
        category: {
            type: String,
            required: true,
            trim: true,
        }, // Category field
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

// Export the Blog model
export default model<IBlog>('Blog', blogSchema);
