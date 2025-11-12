import axios from "axios";
import store from "@/store/store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  } catch (error: any) {
    console.error("Error creating cart item:", error);
    throw error.response ? error.response.data : new Error("Network error");
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
  } catch (error: any) {
    console.error("Error fetching cart:", error);
    throw error.response ? error.response.data : new Error("Network error");
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
  } catch (error: any) {
    console.error("Error deleting cart item:", error);
    throw error.response ? error.response.data : new Error("Network error");
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
  } catch (error: any) {
    console.error("Error clearing cart:", error);
    throw error.response ? error.response.data : new Error("Network error");
  }
};
