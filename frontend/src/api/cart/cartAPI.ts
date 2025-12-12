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

// --------------------------
// Add or Create Cart Item
// --------------------------
export const createCartRequest = async (productId: string, quantity: number) => {
  try {
    const token = store.getState().user.user?.tokens.access.token;
    if (!token) throw new Error("User is not authenticated");

    const response = await axios.post(
      `${API_URL}/cart/add/${productId}`,
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
    console.error("Error creating cart item:", error);
    throw parseAxiosError(error);
  }
};

// --------------------------
// Get Cart
// --------------------------
export const getCartRequest = async () => {
  try {
    const token = store.getState().user.user?.tokens.access.token;
    if (!token) throw new Error("User is not authenticated");

    const response = await axios.get(`${API_URL}/cart/mycart`, {
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

// --------------------------
// Remove Cart Item
// --------------------------
export const removeCartItemRequest = async (productId: string) => {

  console.log("Removing cart item with productId:", productId);
  try {
    const token = store.getState().user.user?.tokens.access.token;
    if (!token) throw new Error("User is not authenticated");

    const response = await axios.post(
      `${API_URL}/cart/remove/${productId}`,
      {},
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

// --------------------------
// Clear Entire Cart
// --------------------------
export const clearCartRequest = async () => {
  try {
    const token = store.getState().user.user?.tokens.access.token;
    if (!token) throw new Error("User is not authenticated");

    const response = await axios.post(
      `${API_URL}/cart/clear`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    console.error("Error clearing cart:", error);
    throw parseAxiosError(error);
  }
};
