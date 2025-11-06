// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductResponse } from '@/types/product'

export interface Products {
    products: ProductResponse[];
}

const initialState: Products = {  // Correct type for initialState
    products: [],
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductResponse[]>) => {
            state.products = action.payload;
        },
    },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
