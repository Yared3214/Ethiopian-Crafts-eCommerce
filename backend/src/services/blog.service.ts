import Blog, { IBlog } from "../models/blog.schema";

class BlogService {
    // Create a new blog
    async createBlog(data: {
        title: string;
        slug: string;
        description: string[];
        images: string[];
        badges: string[];
        category: string;
    }): Promise<IBlog> {
        const newBlog = new Blog(data);
        await newBlog.save();
        return newBlog;
    }

    // Get all blogs
    async getAllBlogs(): Promise<IBlog[]> {
        return await Blog.find();
    }

    // Get a single blog by slug
    async getSingleBlog(slug: string): Promise<IBlog | null> {
        return await Blog.findOne({ slug });
    }

    // Update a blog
    async updateBlog(slug: string, data: {
        title?: string;
        description?: string[];
        images?: string[];
        badges?: string[];
        category?: string;
    }): Promise<IBlog | null> {
        return await Blog.findOneAndUpdate(
            { slug },
            data,
            { new: true } // Return the updated document
        );
    }

    // Delete a blog
    async deleteBlog(slug: string): Promise<IBlog | null> {
        return await Blog.findOneAndDelete({ slug });
    }
}

export const blogService = new BlogService();
