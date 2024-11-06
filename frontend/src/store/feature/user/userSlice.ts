// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { AuthResponse } from '../../../types/user';

interface UserState {
    user: AuthResponse | null;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    user: null,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthResponse>) => {
            state.user = action.payload;
            state.isLoggedIn = true;

            // Save user data in cookies
            Cookies.set('user', JSON.stringify(action.payload), { expires: 7 }); // Expires in 7 days
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;

            // Remove user data from cookies
            Cookies.remove('user');
        },
        setUserFromCookie: (state) => {
            const userData = Cookies.get('user');
            if (userData) {
                state.user = JSON.parse(userData);
                state.isLoggedIn = true;
            }
        },
    },
});

export const { login, logout, setUserFromCookie } = userSlice.actions;
export default userSlice.reducer;
