import express from 'express';
import { adminMiddleware, requireSignIn } from '../middlewares/authMiddleware';
import { getAllUserOrders, getAllOrders, updateOrderStatus } from '../controllers/order.controller';
const router = express.Router();



router.get('/user', requireSignIn, getAllUserOrders);
router.get('/get/all', requireSignIn, adminMiddleware, getAllOrders);
router.put('/update-status/:orderId', requireSignIn, adminMiddleware, updateOrderStatus);

export default router;