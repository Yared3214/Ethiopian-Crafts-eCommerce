// src/routes/artisan.routes.ts
import express from 'express';
import upload from '../middlewares/upload';
import { createArtisan, getAllArtisans, getSingleArtisan, updateArtisan, deleteArtisan, toggleActivateArtisan } from '../controllers/artisan.controller';
import { requireSignIn, adminMiddleware } from '../middlewares/authMiddleware';



const router = express.Router();

// Use the upload middleware to handle file uploads
router.post('/create', upload.single('profilePic'), createArtisan); // 'profilePic' should match the key in your form data

// get all artisans
router.get('/get/all', getAllArtisans);

// get single artisan
router.get('/:slug', getSingleArtisan);

// update artisan
router.put('/update/:slug', upload.single('profilePic'), updateArtisan);

// delete artisan

router.delete('/delete/:slug', deleteArtisan);
router.post('/toggle-activate/:userId', requireSignIn, adminMiddleware, toggleActivateArtisan)




export default router;


