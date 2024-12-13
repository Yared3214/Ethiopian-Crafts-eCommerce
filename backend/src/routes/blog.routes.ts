import express from 'express';
import { 
    createBlog, 
    getAllBlogs, 
    getSingleBlog, 
    updateBlog, 
    deleteBlog 
} from '../controllers/blog.controller';
import { requireSignIn, adminMiddleware } from '../middlewares/authMiddleware';
import { uploadMultipleFiles } from '../middlewares/upload';

const router = express.Router();

// Blog Routes

// Create a new blog
router.post(
    '/create', 
    requireSignIn, 
    adminMiddleware, 
    uploadMultipleFiles('image', 1), // Allow uploading up to 10 images
    createBlog
);

// Get all blogs
router.get('/', getAllBlogs);

// Get a single blog by slug
router.get('/single/:slug', getSingleBlog);

// Update a blog
router.put(
    '/update/:slug', 
    requireSignIn, 
    adminMiddleware, 
    uploadMultipleFiles('image', 1), // Allow uploading up to 10 images for update
    updateBlog
);

// Delete a blog by slug
router.delete(
    '/delete/:slug', 
    requireSignIn, 
    adminMiddleware, 
    deleteBlog
);

export default router;
