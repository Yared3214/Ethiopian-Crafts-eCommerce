import { Response } from "express";
import { authenticatedRequest } from "../middlewares/authMiddleware";
import { cartService } from "../services/cart.service";
import { userService } from "../services/user.service";
import { orderService } from "../services/order.service";
import * as chapaService from "../services/checkout.service";
import ApiError from "../utils/ApiError";

/**
 * 🧾 Create Order & Start Checkout
 */
export const createOrder = async (req: authenticatedRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user._id;

    // 1️⃣ Fetch user's cart
    const cart = await cartService.getCartByUserId(userId);
    if (!cart) return new ApiError(404, "Cart not found").send(res);
    if (cart.items.length === 0) return new ApiError(400, "Cart is empty").send(res);

    // 2️⃣ Fetch user details
    const user = await userService.getUserById(userId);
    if (!user) return new ApiError(404, "User not found").send(res);

    // 3️⃣ Check for existing order for this cart
    let order = await orderService.getOrderByCartId(cart._id);

    if (!order) {
      // 4️⃣ Map cart items to match OrderService requirements
      const OrderItems = cart.items.map((item: any) => ({
        ProductItem: item.ProductItem,
        ProductName: item.ProductName || item.product?.name || "Unknown Product",
        productImage: item.productImage || item.product?.image || "",
        quantity: item.quantity,
        price:item.price,
      }));

      // 5️⃣ Create a new order
      const orderData = {
        user: userId,
        cartId: cart._id,
        OrderItems,
        total_price: cart.totalPrice,
        order_status: "pending",
      };

      order = await orderService.createOrder(orderData);
      if (!order) return new ApiError(500, "Failed to create order").send(res);
    }

    // 6️⃣ Initialize Chapa payment
    const payment = await chapaService.checkout(order, user);

    return res.status(200).json({
      message: "Payment initiated successfully",
      payment,
      orderId: order._id,
    });
  } catch (error: any) {
    console.error("Error during checkout:", error);
    return new ApiError(500, error.message || "Internal server error").send(res);
  }
};


/**
 * 💳 Verify Checkout After Payment
 */
export const verifyCheckout = async (req: authenticatedRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user._id;

    // 1️⃣ Fetch user
    const user = await userService.getUserById(userId);
    if (!user) return new ApiError(404, "User not found").send(res);

    // 2️⃣ Fetch user's cart
    const cart = await cartService.getCartByUserId(userId);
    if (!cart) return new ApiError(404, "Cart not found").send(res);

    // 3️⃣ Fetch order associated with this cart
    const order = await orderService.getOrderByCartId(cart._id);
    if (!order) return new ApiError(404, "Order not found").send(res);

    // 4️⃣ Verify with Chapa
    const verificationResult = await chapaService.verifyCheckout(order.tx_ref);
    console.log("the veriffffication status", verificationResult);

    if (verificationResult.status === "success") {

      // 5️⃣ Update order payment status and overall status
      order.payment_status = "paid";
      await order.save();

      // 6️⃣ Clear the user's cart
      await cartService.deleteCart(userId);

      return res.status(200).json({
        message: "Payment successful! Order confirmed.",
        orderId: order._id,
        verification: verificationResult,
      });
    } else {
      return new ApiError(400, "Payment verification failed").send(res);
    }
  } catch (error: any) {
    console.error("Error in verifyCheckout:", error);
    return new ApiError(500, error.message || "Internal server error").send(res);
  }
};


