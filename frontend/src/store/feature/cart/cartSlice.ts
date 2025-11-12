import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductResponse } from "@/types/product";  // Ensure the Product type is correctly imported

// Define CartItem and CartState interfaces
export interface CartItem {
    product: ProductResponse; // Store the entire product object
    quantity: number; // Store the quantity of the product in the cart
}

export interface CartState {
    cartItems: CartItem[]; // Array of CartItems
}

// Try to get the cart data from localStorage when the app loads
const savedCart = typeof window !== "undefined" ? localStorage.getItem('cartItems') : null;
const initialState: CartState = {
    cartItems: savedCart ? JSON.parse(savedCart) : [], // Initialize from localStorage or default to an empty cart
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add a product to the cart or update the quantity if it already exists
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const { product, quantity } = action.payload;
            const existingItem = state.cartItems.find(item => item.product._id === product._id);

            if (existingItem) {
                // If the item exists, update the quantity
                existingItem.quantity = quantity; // Directly set the new quantity, don't add to it
            } else {
                // If the item doesn't exist, add it with the specified quantity
                state.cartItems.push({ product, quantity });
            }

            // Save updated cart to localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        // Remove a product from the cart
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(item => item.product._id !== action.payload);

            // Save updated cart to localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        // Update the quantity of a product in the cart
        updateCartQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
            const { productId, quantity } = action.payload;
            const existingItem = state.cartItems.find(item => item.product._id === productId);

            if (existingItem && quantity > 0) {
                existingItem.quantity = quantity;
            } else if (existingItem) {
                // Remove item if quantity is set to 0
                state.cartItems = state.cartItems.filter(item => item.product._id !== productId);
            }

            // Save updated cart to localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        // Clear the entire cart
        clearCart: (state) => {
            state.cartItems = [];

            // Clear cart in localStorage
            localStorage.removeItem('cartItems');
        },
    },
});

// Selector to calculate the number of distinct items in the cart (unique product count)
export const selectCartItemCount = (state: { cart: CartState }) => {
    return state.cart.cartItems.length; // Count the number of distinct items (not the quantity)
};

// Selector to calculate the total quantity of items in the cart (including quantity per product)
export const selectTotalQuantity = (state: { cart: CartState }) => {
    return state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
};

// Selector to get all cart items
export const selectCartItems = (state: { cart: CartState }) => {
    return state.cart.cartItems;
};

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
