// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './feature/user/userSlice';
import productReducer from './feature/product/productSlice';
import cartReducer from './feature/cart/cartSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        cart: cartReducer,
    },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
