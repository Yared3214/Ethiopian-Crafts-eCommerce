import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper to safely extract error message
const parseAxiosError = (error: unknown): string | object => {
    if (axios.isAxiosError(error)) {
      return error.response?.data || error.message;
    }
    return 'Network error';
  };

// 🧾 Types
export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartResponse {
  data: {
    _id: string;
    items: CartItem[];
    totalAmount: number;
  };
  message?: string;
}

// 🛒 Create Cart
export const createCartRequest = async (
  token: string,
  items: CartItem[]
): Promise<CartResponse> => {
  try {
    const response = await axios.post<CartResponse>(
      `${API_URL}/cart`,
      { items },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error creating cart:", error);
    throw parseAxiosError(error);
  }
};

// 📦 Get Cart (Read)
export const getCartRequest = async (token: string): Promise<CartResponse> => {
  try {
    const response = await axios.get<CartResponse>(`${API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching cart:", error);
    throw parseAxiosError(error);
  }
};

// ✏️ Update Cart Item (e.g., change quantity)
export const updateCartItemRequest = async (
  token: string,
  productId: string,
  quantity: number
): Promise<CartResponse> => {
  try {
    const response = await axios.put<CartResponse>(
      `${API_URL}/cart/${productId}`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error updating cart item:", error);
    throw parseAxiosError(error);
  }
};

// ❌ Delete Cart Item
export const deleteCartItemRequest = async (
  token: string,
  productId: string
): Promise<CartResponse> => {
  try {
    const response = await axios.delete<CartResponse>(
      `${API_URL}/cart/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error deleting cart item:", error);
    throw parseAxiosError(error);
  }
};

// 🧹 Clear Entire Cart
export const clearCartRequest = async (token: string): Promise<CartResponse> => {
  try {
    const response = await axios.delete<CartResponse>(`${API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Error clearing cart:", error);
    throw parseAxiosError(error);
  }
};
