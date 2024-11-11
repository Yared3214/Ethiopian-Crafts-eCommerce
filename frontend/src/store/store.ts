// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './feature/user/userSlice';
import productReducer from './feature/product/productSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
    },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
