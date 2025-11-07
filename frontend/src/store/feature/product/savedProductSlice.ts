// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductResponse } from '@/types/product'

export interface SavedProducts {
    savedProducts: ProductResponse[];
}

const initialState: SavedProducts = {  // Correct type for initialState
    savedProducts: [],
};

const savedProductSlice = createSlice({
    name: 'savedProduct',
    initialState,
    reducers: {
        setSavedProducts: (state, action: PayloadAction<ProductResponse[]>) => {
            state.savedProducts = action.payload;
        },
    },
});

export const { setSavedProducts } = savedProductSlice.actions;
export default savedProductSlice.reducer;
