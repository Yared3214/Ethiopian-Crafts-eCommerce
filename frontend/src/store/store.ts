import { configureStore } from '@reduxjs/toolkit';
import userReducer from './feature/user/userSlice';
import productReducer from './feature/product/productSlice';
import savedProductReducer from './feature/product/savedProductSlice'
import cartReducer from './feature/cart/cartSlice';
import blogReducer from './feature/blog/blogSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        savedProduct: savedProductReducer,
        cart: cartReducer,
        blog: blogReducer
    },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
