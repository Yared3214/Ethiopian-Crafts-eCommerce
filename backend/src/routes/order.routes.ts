import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware';
import { getAllUserOrders } from '../controllers/order.controller';
const router = express.Router();



router.get('/user', requireSignIn, getAllUserOrders);

export default router;