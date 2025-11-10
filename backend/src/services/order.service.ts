import Order, { IOrder } from '../models/order.schema';
import { Types } from 'mongoose';

class OrderService {

    // create a new order
    async createOrder (data: { user: string; items: { product: string; title: string; price: number; quantity: number; image?: string }[]; totalAmount: number; status?: string }): Promise<IOrder> {
        const newOrder = new Order(data);
        await newOrder.save();
        return newOrder;
    }

    async getOrdersByUser(userId: string) {
        return await Order.find({ user: userId }).sort({ createdAt: -1 });
    }
}


export const orderService = new OrderService();

