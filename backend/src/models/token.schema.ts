import { Schema, model, Document } from 'mongoose';
import { tokenTypes } from '../config/token';

// Define an interface for the Token document (extends mongoose.Document)
export interface IToken extends Document {
    token: string;
    user: Schema.Types.ObjectId;
    type: string;
    expires: Date;
    blacklisted: boolean;
}

// Define the token schema
const tokenSchema = new Schema<IToken>(
    {
        token: {
            type: String,
            required: true,
            index: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: [tokenTypes.ACCESS, tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD],
            required: true,
        },
        expires: {
            type: Date,
            required: true,
        },
        blacklisted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// Export the Token model with IToken type
export default model<IToken>('Token', tokenSchema);
