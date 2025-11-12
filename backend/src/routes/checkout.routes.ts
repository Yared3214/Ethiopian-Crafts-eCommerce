import express from 'express';
import { createOrder, verifyCheckout } from '../controllers/checkout.controller';
import { requireSignIn } from '../middlewares/authMiddleware';

const router = express.Router();

// POST /api/checkout -> create order and start payment
router.post('/', requireSignIn, createOrder);

// GET /api/checkout/verify/:id -> verify payment
router.get('/verify/:id', requireSignIn, verifyCheckout);

export default router;
