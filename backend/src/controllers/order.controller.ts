import { Request, Response } from 'express';
import ApiError from '../utils/ApiError';
import { authenticatedRequest } from '../middlewares/authMiddleware';
import { orderService } from '../services/order.service';
import { cartService } from '../services/cart.service';
// import { deliveryService } from '../services/delivery.service'; // optional

/**
 * Create a new order
 */

export const createOrder = async (req: authenticatedRequest, res: Response): Promise<void> => {
    try {
        const { cartId } = req.body;
        const userId = req.user._id;

        if (!cartId) {
            throw new ApiError(400, 'Cart ID is required');
        }

        // 1️⃣ Fetch cart by ID
        const cart = await cartService.getCartById(cartId);
        if (!cart) {
            throw new ApiError(404, 'Cart not found');
        }

        // 2️⃣ Check ownership
        if (cart.user.toString() !== userId.toString()) {
            throw new ApiError(403, 'You are not allowed to access this cart');
        }

        const OrderItems = cart.items.map((item: any) => ({
            ProductName: item.ProductName,
            ProductItem: item.ProductItem,
            productImage: item.productImage,
            quantity: item.quantity,
        }));

       
        // 5️⃣ Create order object
        const orderData = {
            user: userId,
            cartId,
            OrderItems,
            total_price: cart.totalPrice,
        };

        const newOrder = await orderService.createOrder(orderData);
        if (!newOrder) {
            throw new ApiError(500, 'Failed to create order');
        }


        res.status(201).json({
            status: 'success',
            data: { order: newOrder },
        });
    } catch (error: any) {
        console.error('Error creating order:', error);
        res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message || 'Internal Server Error',
        });
    }
};

/**
 * Update Order Status
 */
export const updateOrderStatus = async (req: authenticatedRequest, res: Response): Promise<void> => {
    try {
        const { orderId } = req.params;
        const { order_status } = req.body;

        if (!order_status) {
            throw new ApiError(400, 'order_status is required');
        }

        const updatedOrder = await orderService.updateOrderById(orderId, order_status);
        if (!updatedOrder) {
            throw new ApiError(404, 'Order not found');
        }

        res.status(200).json({
            status: 'success',
            message: 'Order status updated successfully',
            data: {
                updatedOrder,
            },
        });
    } catch (error: any) {
        console.error('Error updating order status:', error);
        res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message || 'Internal Server Error',
        });
    }
};

/**
 * Get Order by ID
 */
export const getOrderById = async (req: authenticatedRequest, res: Response): Promise<void> => {
    try {
        const { orderId } = req.params;

        const order = await orderService.getOrderById(orderId);
        if (!order) {
            throw new ApiError(404, 'Order not found');
        }

        res.status(200).json({
            status: 'success',
            data: { order },
        });
    } catch (error: any) {
        console.error('Error fetching order:', error);
        res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message || 'Internal Server Error',
        });
    }
};

/**
 * Get All Orders (Admin)
 */
export const    getAllOrders = async (_req: authenticatedRequest, res: Response): Promise<void> => {
    try {
        const orders = await orderService.getAllOrders();
        const sortedOrders = orders.sort((a: any, b: any) => b.createdAt - a.createdAt);

        res.status(200).json({
            status: 'success',
            message: 'All orders retrieved successfully',
            data: { orders: sortedOrders },
        });
    } catch (error: any) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({
            status: 'error',
            message: error.message || 'Internal Server Error',
        });
    }
};

/**
 * Get All Orders for Logged-in User
 */
export const getAllUserOrders = async (req: authenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user._id;
        const orders = await orderService.getAllUserOrders(userId);

        res.status(200).json({
            status: 'success',
            data: { orders },
        });
    } catch (error: any) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({
            status: 'error',
            message: error.message || 'Internal Server Error',
        });
    }
};
