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
        completeProfile_: (state, action: PayloadAction<string[]>) => {
            const userData = Cookies.get("user");
            if (userData) {
                const parsedUserData = JSON.parse(userData);
                const updatedUserData = {
                    ...parsedUserData,
                    user: action.payload
                }

                // Update cookie
              Cookies.set("user", JSON.stringify(updatedUserData), { expires: 7 });
          
              // Update redux state too
              state.user = updatedUserData;
            }
        },
        toggle: (state, action: PayloadAction<string[]>) => {
            const userData = Cookies.get("user");
            if (userData) {
              const parsedUserData = JSON.parse(userData);
              const updatedUserData = {
                ...parsedUserData,
                user: {
                  ...parsedUserData.user,
                  savedProducts: action.payload, // ✅ update nested field
                },
              };
          
              // Update cookie
              Cookies.set("user", JSON.stringify(updatedUserData), { expires: 7 });
          
              // Update redux state too
              state.user = updatedUserData;
            }
          },
          
    },
});

export const { login, logout, setUserFromCookie, toggle, completeProfile_ } = userSlice.actions;
export default userSlice.reducer;
