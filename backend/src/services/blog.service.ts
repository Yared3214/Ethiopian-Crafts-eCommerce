import Blog, { IBlog } from "../models/blog.schema";

class BlogService {
    // Create a new blog
    async createBlog(data: { 
        title: string; 
        slug: string; 
        category: string; 
        description: string; 
        image: string; 
        badge: string; 
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
    async updateBlog(
        slug: string, 
        data: { 
            title?: string; 
            category?: string; 
            description?: string; 
            image?: string; 
            badge?: string; 
        }
    ): Promise<IBlog | null> {
        const existingBlog = await Blog.findOne({ slug });

        if (!existingBlog) {
            throw new Error("Blog not found");
        }

        // Update blog fields with new values if provided
        const updatedBlogData: any = {
            ...existingBlog.toObject(),
            ...data
        };

        // Update the blog in the database
        return await Blog.findOneAndUpdate(
            { slug },
            updatedBlogData,
            { new: true } // Return the updated document
        );
    }

    // Delete a blog
    async deleteBlog(slug: string): Promise<IBlog | null> {
        return await Blog.findOneAndDelete({ slug });
    }
}

export const blogService = new BlogService();
