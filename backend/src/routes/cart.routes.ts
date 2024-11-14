// src/routes/artisan.routes.ts
import express from 'express';
import { addItemToCart } from '../controllers/cart.controller';
import { requireSignIn } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/add', requireSignIn, addItemToCart)




export default router;


