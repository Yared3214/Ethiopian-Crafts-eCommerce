// src/models/cart.schema.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface ICart extends Document {
    user: Types.ObjectId;
    totalPrice: number;
    items: Array<{
        ProductItem: Types.ObjectId;
        productImage: string;
        ProductName: string;
        quantity: number;
        price: number;
    }>;
    status: 'pending' | 'ordered' | 'delivered';
}

const CartSchema = new Schema<ICart>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalPrice: { type: Number, default: 0.0 },
    items: [
        {
            ProductItem: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            productImage: { type: String, default: '' }, // added field
            ProductName: { type: String, required: true },
            quantity: { type: Number, required: true, min: 1, default: 1 },
            price: { type: Number, required: true }
        }
    ],
    status: { type: String, enum: ['pending', 'ordered', 'delivered'], default: 'pending' },
}, { timestamps: true });

// Default items to empty array for new carts
CartSchema.path('items').default(() => []);

export default model<ICart>('Cart', CartSchema);
