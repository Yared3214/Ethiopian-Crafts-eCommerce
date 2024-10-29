// src/routes/artisan.routes.ts
import express from 'express';
import upload from '../middlewares/upload'; // Adjust the path as necessary
import { createArtisan, getAllArtisans, getSingleArtisan, updateArtisan, deleteArtisan } from '../controllers/artisan.controller';



const router = express.Router();

// Use the upload middleware to handle file uploads
router.post('/create', upload.single('profilePic'), createArtisan); // 'profilePic' should match the key in your form data

// get all artisans
router.get('/get/all', getAllArtisans);

// get single artisan
router.get('/:slug', getSingleArtisan);

// update artisan
router.put('/update/:slug', upload.single("profilePic"), updateArtisan);

// delete artisan

router.delete('/delete/:slug', deleteArtisan);




export default router;


