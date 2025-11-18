import { configureStore } from '@reduxjs/toolkit';
import userReducer from './feature/user/userSlice';
import productReducer from './feature/product/productSlice';
import savedProductReducer from './feature/product/savedProductSlice'
import cartReducer from './feature/cart/cartSlice';
import blogReducer from './feature/blog/blogSlice';
import artisanReducer from './feature/artisan/artisanSlice'
import customersReducer from './feature/user/customersSlice'
import orderReducer from './feature/order/orderSlice'
import notificationReducer from './feature/notification/notificationSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        customer: customersReducer,
        artisan: artisanReducer,
        product: productReducer,
        savedProduct: savedProductReducer,
        cart: cartReducer,
        blog: blogReducer,
        order: orderReducer,
        notification: notificationReducer,
    },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
