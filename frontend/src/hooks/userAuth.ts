// src/hooks/useAuth.ts

import { useDispatch } from 'react-redux';
import { login, logout } from '../store/feature/user/userSlice';
import { loginUser, registerUser, forgetPassword, resetPassword } from '../api/user/userAPI';
import { AuthResponse } from '../types/user';
import { useState } from 'react';




const useAuth = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState<string | null>(null); // State to hold error messages
    const [isLoading, setIsLoading] = useState<boolean>(false)

    
    const loginUserHandler = async (email: string, password: string) => {
        console.log("login", { email, password })
        setError(null); // Reset error state
        setIsLoading(true);
        try {
            const data: AuthResponse = await loginUser(email, password);
            dispatch(login(data)); // Dispatch the login action with user data
            return data;
        } catch (error) {
            // Set error message in state
            setError((error as any).message || 'Login failed');
        } finally {
            setIsLoading(false)
        }
    };


    const registerUserHandler = async (fullName: string, email: string, password: string, confirmPassword: string) => {
        console.log('register', { fullName, email, password, confirmPassword });

        setError(null); // Reset error state
        setIsLoading(true)
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
        } finally {
            setIsLoading(false)
        }
    };

    const logoutUserHandler = () => {
        dispatch(logout()); // Dispatch the logout action
    };


    //forgot password

    const forgotPasswordHandler = async (email: string) => {
        console.log("email", { email })
        setError(null)
        setIsLoading(true)
        try {
            const data = await forgetPassword(email);
            return data;
        }
        catch (error: any) {
            console.log("error while forgetting the password", error)
            setError((error as any).message || 'Forgetting failed');
        } finally {
            setIsLoading(false)
        }

    }

    //reset password
    const resetPasswordHandler = async (token: string, password: string, confirmPassword: string) => {
        setError(null)
        setIsLoading(true)
        try {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            const data = await resetPassword(token, password);
            return data;
        } catch (error) {
            setError((error as any).message || 'Reset failed');
        } finally {
            setIsLoading(false)
        }
    }



    return {
        loginUser: loginUserHandler,
        registerUser: registerUserHandler,
        logoutUser: logoutUserHandler,
        forgetPassword: forgotPasswordHandler,
        resetPassword: resetPasswordHandler,
        error,
        isLoading
    };
};

export default useAuth;
