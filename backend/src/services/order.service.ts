import Order, { IOrder } from '../models/order.schema';
import { Types } from 'mongoose';

class OrderService {
  /**
   * Create a new order
   */
  async createOrder(data: {
    user: Types.ObjectId;
    cartId: any;
    OrderItems: Array<{
      ProductItem: any;
      ProductName?: any;
      quantity: any;
      productImage?: any;
      price?: any;
    }>;
    total_price: number;
    order_status?: string;
  }): Promise<IOrder> {
    const newOrder = new Order({
      user: data.user,
      cartId: data.cartId,
      OrderItems: data.OrderItems,
      total_price: data.total_price,
      order_status: data.order_status || 'pending',
    });

    await newOrder.save();
    return newOrder;
  }


  /**
   * Get all orders for a specific user
   */
  async getAllUserOrders(userId: Types.ObjectId): Promise<IOrder[]> {
    return await Order.find({ user: userId }).sort({ createdAt: -1 });
  }

  /**
   * Get all orders (Admin)
   */
  async getAllOrders(): Promise<IOrder[]> {
    return await Order.find().sort({ createdAt: -1 })
    .populate('user', 'fullName email address')
    .populate('OrderItems.ProductItem', 'ProductName price');
  }

  /**
   * Get an order by ID
   */
  async getOrderById(orderId: string): Promise<IOrder | null> {
    return await Order.findById(orderId)
      .populate('user', 'fullName email');
  }

  // get order by cart ID
  async getOrderByCartId(cartId: any): Promise<IOrder | null> {
    return await Order.findOne({ cartId });
  }

  /**
   * Update order status
   */
  async updateOrderById(orderId: string, order_status: string): Promise<IOrder | null> {
    return await Order.findByIdAndUpdate(orderId, { order_status }, { new: true })
    .populate('user', 'fullName email address fcmToken')
    .populate('OrderItems.ProductItem', 'ProductName price');
  }
}

export const orderService = new OrderService();
