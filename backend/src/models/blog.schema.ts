import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    slug: string;
    category: string;
    description: string;
    image: string;
    badge: string;
}

const blogSchema = new Schema<IBlog>({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    badge: { type: String, required: true },
});

const Blog = mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;
