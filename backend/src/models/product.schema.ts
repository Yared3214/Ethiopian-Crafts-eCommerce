// src/models/product.schema.ts
import { Schema, model, Document, Types } from 'mongoose';
import { IArtisan } from './artisan.schema';   // Import Artisan interface for createdBy reference

export interface IProduct extends Document {
    title: string;
    images: string[];
    description: string;
    materials: string[];
    createdBy: Types.ObjectId | IArtisan;      // Reference to the Artisan
    category: string;
    price: number;
    rating: number;
    slug: string;
}

const productSchema = new Schema<IProduct>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        images: [
            {
                type: String,
                required: true,
            },
        ],
        description: {
            type: String,
            required: true,
            trim: true,
        },
        materials: [
            {
                type: String,
                required: true,
            },
        ],
        createdBy: {
            type: String,
            ref: 'Artisan',
            required: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
            enum: ['Art', 'Craft', 'Fashion', 'Home Decor', 'Jewelry', 'Others'],
        },
        price: {
            type: Number,
            required: true,
            min: 1,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model<IProduct>('Product', productSchema);
