// src/models/product.schema.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface INotification extends Document {
    user: Types.ObjectId;
    title: string;
    message: string;
    link?: string;
    type: string;
    read: boolean;
}

const notificationSchema = new Schema<INotification>(
    {
        user: {
              type: Schema.Types.ObjectId,
              ref: "User",
              required: true,
            },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
                type: String,
                required: true,
                trim: true,
            },
        type: {
            type: String,
            required: true,
            trim: true,
        },
        link: {
            type: String,
            trim: true,
        },
        read: {
                type: Boolean,
                default: false,
            },
    },
    {
        timestamps: true,
    }
);

export default model<INotification>('Notification', notificationSchema);
