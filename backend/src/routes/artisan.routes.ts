// src/routes/artisan.routes.ts
import express from 'express';
import upload from '../middlewares/upload'; // Adjust the path as necessary
import { createArtisan } from '../controllers/artisan.controller';

const router = express.Router();

// Use the upload middleware to handle file uploads
router.post('/create', upload.single('profilePic'), createArtisan); // 'profilePic' should match the key in your form data

export default router;


