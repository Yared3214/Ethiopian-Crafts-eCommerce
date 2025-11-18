// src/features/artisan/artisanSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArtisansResponse } from '@/types/artisan';
import { Order } from '@/api/order/orderAPI';

export interface Orders {
    orders: Order[];
}

const initialState: Orders = {  // Correct type for initialState
    orders: [],
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
        },
        updateOrders: (state, action: PayloadAction<ArtisansResponse>) => {
                    const updated = action.payload;
                    const order = state.orders.find(u => u._id === updated._id);
                    if (order) {
                      Object.assign(order, updated); // ← Same array, same user object
                    }
                  },
    },
});

export const { setOrders, updateOrders } = orderSlice.actions;
export default orderSlice.reducer;
