// src/models/artisan.schema.ts
import mongoose, { Schema, model, Document } from 'mongoose';


export interface IOrder extends Document {
    user: mongoose.Schema.Types.ObjectId; // reference to User
    items: [
        {
            product: mongoose.Schema.Types.ObjectId; // reference to Product
            title: string;
            price: number;
            quantity: number;
            image?: string;
        }
    ]
    totalAmount: number;
    status: string;
}


const orderSchema = new Schema<IOrder>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                title: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                image: {
                    type: String,
                    required: true,
                },
            }
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);
export default model<IOrder>('Order', orderSchema);