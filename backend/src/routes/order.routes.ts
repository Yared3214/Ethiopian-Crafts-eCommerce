import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware';
import { createOrder, getOrdersByUser } from '../controllers/order.controller';
const router = express.Router();



router.post('/create/', requireSignIn, createOrder);
router.get('/', requireSignIn, getOrdersByUser);

export default router;