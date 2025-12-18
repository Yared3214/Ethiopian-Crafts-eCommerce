import axios from "axios";
import store from "@/store/store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper to safely extract error message
const parseAxiosError = (error: unknown): string | object => {
    if (axios.isAxiosError(error)) {
      return error.response?.data || error.message;
    }
    return 'Network error';
  };

// 🧱 Types
export interface OrderItem {
    ProductItem: string; // product reference ID
    quantity: number;
    price?: number;
    productName?: string;
    image?: string;
}

export interface Order {
    _id: string;
    user: {
        _id: string;
        fullName: string;
        email: string;
        fcmToken: string;
        address: {
            country: string;
            city: string;
            subcity: string;
        }
    };
    cartId: string;
    OrderItems: OrderItem[];
    total_price: number;
    tx_ref?: string;
    payment_status: "pending" | "paid" | "failed";
    order_status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    createdAt: string;
    updatedAt: string;
}

export interface OrderResponse {
    status: string;
    message?: string;
    data?: {
        order?: Order;
        orders?: Order[];
        updatedOrders?: Order[];
    };
}

interface GetAllOrdersRequestResponse {
    status: string;
    message?: string;
    data: {
        orders: Order[];
    };
}

interface UpdateOrderStatusRequestResponse {
    status: string;
    message?: string;
    data: {
        updatedOrder: Order;
    };
}

/* ========================================================
   🛍️ ORDER API REQUESTS
======================================================== */

// 🧾 Create New Order
// export const createOrderRequest = async (
//   token: string,
//   cartId: string
// ): Promise<OrderResponse> => {
//   try {
//     const response = await axios.post<OrderResponse>(
//       `${API_URL}/orders`,
//       { cartId },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data;
//   } catch (error: any) {
//     console.error("Error creating order:", error);
//     throw parseAxiosError(error);
//   }
// };

// 📦 Get All Orders (Admin)
export const getAllOrdersRequest = async (token: string): Promise<GetAllOrdersRequestResponse> => {
    try {
        if (!token) throw new Error("User is not authenticated");
        const response = await axios.get<GetAllOrdersRequestResponse>(`${API_URL}/orders/get/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: unknown) {
        console.error("Error fetching all orders:", error);
        throw parseAxiosError(error);
    }
};

// 👤 Get Orders for Logged-In User
export const getAllUserOrdersRequest = async (): Promise<GetAllOrdersRequestResponse> => {
    try {

        const token = store.getState().user.user?.tokens.access.token;
        if (!token) throw new Error("User is not authenticated");

        const response = await axios.get<GetAllOrdersRequestResponse>(`${API_URL}/orders/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Fetched user orders response:", response.data);
        return response.data;
    } catch (error: unknown) {
        console.error("Error fetching user orders:", error);
        throw parseAxiosError(error);
    }
};

// 🔍 Get Single Order by ID
export const getOrderByIdRequest = async (
    token: string,
    orderId: string
): Promise<OrderResponse> => {
    try {
        const response = await axios.get<OrderResponse>(
            `${API_URL}/orders/${orderId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error: unknown) {
        console.error("Error fetching order by ID:", error);
        throw parseAxiosError(error);
    }
};

// 🔄 Update Order Status (Admin)
export const updateOrderStatusRequest = async (
    token: string,
    orderId: string,
    order_status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
): Promise<UpdateOrderStatusRequestResponse> => {
    try {
        const response = await axios.put<UpdateOrderStatusRequestResponse>(
            `${API_URL}/orders/update-status/${orderId}`,
            { order_status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error: unknown) {
        console.error("Error updating order status:", error);
        throw parseAxiosError(error);
    }
};
