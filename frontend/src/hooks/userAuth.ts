// src/hooks/useAuth.ts

import { useDispatch } from 'react-redux';
import { login, logout } from '../store/feature/user/userSlice';
import { loginUser, registerUser } from '../api/user/userAPI';
import { AuthResponse } from '../types/user';
import { useState } from 'react';


const useAuth = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState<string | null>(null); // State to hold error messages

    const loginUserHandler = async (email: string, password: string) => {
        console.log("login", { email, password })
        setError(null); // Reset error state
        try {
            const data: AuthResponse = await loginUser(email, password);
            dispatch(login(data)); // Dispatch the login action with user data
            return data;
        } catch (error) {
            // Set error message in state
            setError((error as any).message || 'Login failed');
        }
    };


    const registerUserHandler = async (fullName: string, email: string, password: string, confirmPassword: string) => {
        console.log('register', { fullName, email, password, confirmPassword });

        setError(null); // Reset error state

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const data = await registerUser(fullName, email, password);
            console.log("registerd user-data", data);
            return data;
        } catch (error) {
            // Set error message in state
            setError((error as any).message || 'Registration failed');
        }
    };

    const logoutUserHandler = () => {
        dispatch(logout()); // Dispatch the logout action
    };

    return {
        loginUser: loginUserHandler,
        registerUser: registerUserHandler,
        logoutUser: logoutUserHandler,
        error, // Expose error state
    };
};

export default useAuth;
