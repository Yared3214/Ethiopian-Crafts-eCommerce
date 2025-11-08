import { Request, Response } from "express";
import ApiError from "../utils/ApiError";
import { orderService } from "../services/order.service";



//create order

export const createOrder = async (req: Request, res: Response): Promise<any> => {
    try {
        const { user, items, totalAmount, status } = req.body;

        if(!user || !items || !totalAmount || !status) {
            return new ApiError(400, 'User, Items, Total Amount and Status are required.').send(res);
        }

        const newOrder = await orderService.createOrder({
            user,
            items,
            totalAmount,
            status
        });

        if (newOrder) {
            return res.status(201).json({
                status: 'success',
                message: 'Order created successfully',
                order: newOrder,
            });
        }
    } catch (error) {
        console.error('Error creating order:', error);
        return new ApiError(500, 'Internal server error').send(res);
    } 
}

// get order by user

export const getOrdersByUser = async(req: Request, res: Response): Promise<any> => {
    try {
        const { userId } = req.params;

        const userOrders = await orderService.getOrdersByUser(userId);
        return res.status(200).json({
            status: 'success',
            message: 'All user orders retrieved successfully',
            order: userOrders
        })
    } catch (error) {
        console.error('Error getting all user orders:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
};