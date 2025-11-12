// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types/user';

interface UserState {
    customers: User[];
}

const initialState: UserState = {
    customers: [],
};

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        setCustomers: (state, action: PayloadAction<User[]>) => {
            state.customers = action.payload;
        },
        updateCustomer: (state, action: PayloadAction<User>) => {
            const updated = action.payload;
            const user = state.customers.find(u => u._id === updated._id);
            if (user) {
              Object.assign(user, updated); // ← Same array, same user object
            }
          },
    },
        
});

export const { setCustomers, updateCustomer } = customersSlice.actions;
export default customersSlice.reducer;
