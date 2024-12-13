import { Request, Response } from 'express';
import ApiError from '../utils/ApiError';
import { blogService } from '../services/blog.service';
import { uploadImage } from '../services/image.service';

// Controller to create a new blog with description, badge, image, title, and category
export const createBlog = async (req: Request, res: Response): Promise<any> => {
    try {
        const { title, description, badge, category } = req.body;

        console.log("req.body", req.body)
        // Validate input fields
        if (!title || !description || !badge || !category) {
            return new ApiError(400, 'Title, description, badge, and category are required.').send(res);
        }

        // Validate if image is uploaded
        if (!req.files || !Array.isArray(req.files) || req.files.length !== 1) {
            return new ApiError(400, 'Exactly one image is required.').send(res);
        }

        // Generate a slug from the title
        const slug = title.split(' ').join('-').toLowerCase();

        //check whether ther is a blog with this title before
        const blog = await blogService.getSingleBlog(slug);

        if(blog){
            return new ApiError(400, 'Blog with this title already exist').send(res);
        }

        // Upload the image to Cloudinary
        const imageUrl = await uploadImage(req.files[0].buffer);

        // Create the new blog
        const newBlog = await blogService.createBlog({
            title,
            slug,
            category,
            description,
            image: imageUrl, // Set image URL
            badge,
        });

        // Respond with success
        res.status(201).json({
            status: 'success',
            message: 'Blog created successfully.',
            blog: newBlog,
        });
    } catch (error) {
        console.error('Error creating blog:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
};

// Controller to get a single blog by slug
export const getSingleBlog = async (req: Request, res: Response): Promise<any> => {
    try {
        const { slug } = req.params;
        const blog = await blogService.getSingleBlog(slug);

        if (!blog) return new ApiError(404, 'Blog not found').send(res);

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

// Controller to get all blogs
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

// Controller to delete a blog by slug
export const deleteBlog = async (req: Request, res: Response): Promise<any> => {
    try {
        const { slug } = req.params;
        const blog = await blogService.deleteBlog(slug);

        if (!blog) return new ApiError(404, 'Blog not found').send(res);

        res.status(200).json({
            status: 'success',
            message: 'Blog deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
};

// Controller to update a blog by slug
export const updateBlog = async (req: Request, res: Response): Promise<any> => {
    try {
        const { slug } = req.params;
        const { title, description, badge, category } = req.body;

        const blog = await blogService.getSingleBlog(slug);

        if (!blog) return new ApiError(404, 'Blog not found').send(res);

        // Check if image was uploaded
        let imageUrl = blog.image;

        // Check if req.files is an array of files or an object
        if (req.files) {
            // If it's an array of files
            if (Array.isArray(req.files) && req.files.length === 1) {
                imageUrl = await uploadImage(req.files[0].buffer);
            }
        }


        const updatedBlog = await blogService.updateBlog(slug, {
            title,
            description,
            badge,
            category,
            image: imageUrl,
        });

        res.status(200).json({
            status: 'success',
            message: 'Blog updated successfully',
            blog: updatedBlog,
        });
    } catch (error) {
        console.error('Error updating blog:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
};
