// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './feature/user/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
