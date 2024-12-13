// src/controllers/blog.controller.ts
import { Request, Response } from 'express';
import ApiError from '../utils/ApiError';
import { blogService } from '../services/blog.service';
import { uploadImage } from '../services/image.service';

export const createBlog = async (req: Request, res: Response): Promise<any> => {
    console.log("Request body: ", req.body);
    try {
        const { title, description, badges, category } = req.body;

        // Check if required fields are provided
        if (!title || !description || !category || !Array.isArray(description) || description.length === 0) {
            return new ApiError(400, 'Title, category, and at least one description are required.').send(res);
        }

        // Check if images were uploaded
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return new ApiError(400, 'At least one image is required.').send(res);
        }

        // Check if the blog already exists
        const existingBlog = await blogService.getSingleBlog(title.split(' ').join('-').toLowerCase());
        if (existingBlog) {
            return new ApiError(400, "Blog with this title already exists!").send(res);
        }

        // Upload the images to Cloudinary
        const images = await Promise.all(
            req.files.map(async (file: any) => (
                await uploadImage(file.buffer)
            ))
        );

        // Create the new blog record
        const newBlog = await blogService.createBlog({
            title,
            slug: title.split(' ').join('-').toLowerCase(),
            description,
            badges: badges || [],
            category,
            images,
        });

        res.status(201).json({
            status: 'success',
            message: 'Blog created successfully',
            blog: newBlog,
        });
    } catch (error) {
        console.error('Error creating blog:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
};

export const getAllBlogs = async (req: Request, res: Response): Promise<any> => {
    try {
        const blogs = await blogService.getAllBlogs();
        res.status(200).json({
            status: 'success',
            message: 'Blogs retrieved successfully',
            blogs,
        });
    } catch (error) {
        console.error('Error getting blogs:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
};

export const getSingleBlog = async (req: Request, res: Response): Promise<any> => {
    try {
        const { slug } = req.params;
        const blog = await blogService.getSingleBlog(slug);

        if (!blog) {
            return new ApiError(404, 'Blog not found').send(res);
        }

        res.status(200).json({
            status: 'success',
            message: 'Blog retrieved successfully',
            blog,
        });
    } catch (error) {
        console.error('Error getting blog:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
};

export const updateBlog = async (req: Request, res: Response): Promise<any> => {
    try {
        const { slug } = req.params;
        const { title, description, badges, category } = req.body;
        const blog = await blogService.getSingleBlog(slug);

        if (!blog) {
            return new ApiError(404, 'Blog not found').send(res);
        }

        // Check if images were uploaded
        let images = blog.images;
        if (req.files && Array.isArray(req.files)) {
            images = await Promise.all(
                req.files.map(async (file: any) => (
                   await uploadImage(file.buffer)
                ))
            );
        }

        await blogService.updateBlog(slug, {
            title,
            description,
            badges,
            category,
            images,
        });

        res.status(200).json({
            status: 'success',
            message: 'Blog updated successfully',
        });
    } catch (error) {
        console.error('Error updating blog:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
};

export const deleteBlog = async (req: Request, res: Response): Promise<any> => {
    try {
        const { slug } = req.params;
        const blog = await blogService.deleteBlog(slug);

        if (!blog) {
            return new ApiError(404, 'Blog not found').send(res);
        }

        res.status(200).json({
            status: 'success',
            message: 'Blog deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
};
