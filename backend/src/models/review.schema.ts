// src/models/review.schema.ts
import { Schema, model, Document, Types } from 'mongoose';
import { IUser } from './user.schema';  // Import User interface for reference
import { IProduct } from './product.schema';

export interface IReview extends Document {
    user: Types.ObjectId | IUser;    // Reference to the User who left the review
    product: Types.ObjectId | IProduct;           // Reference to the Product that the review is for
    comment: string;
    rating: number;
}

const reviewSchema = new Schema<IReview>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',          // Reference to User model
            required: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',       // Reference to Product model
            required: true,
        },
        comment: {
            type: String,
            required: true,
            trim: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        }
    },
    {
        timestamps: true,
    }
);

export default model<IReview>('Review', reviewSchema);
