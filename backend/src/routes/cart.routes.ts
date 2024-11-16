// src/routes/artisan.routes.ts
import express from 'express';
import { addItemToCart, clearCart, deleteCart, getMyCart, removeItem } from '../controllers/cart.controller';
import { requireSignIn } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/add/:productId', requireSignIn, addItemToCart)
router.delete('/delete', requireSignIn, deleteCart)
router.post('/clear', requireSignIn, clearCart)
router.post('/remove/:productId', requireSignIn, removeItem)
router.get('/mycart', requireSignIn, getMyCart)



export default router;


