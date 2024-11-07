// src/api/user/userAPI.ts

import axios from 'axios';
import { AuthResponse } from '../../types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Function to log in a user
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        console.log("login response", response.data)
        return response.data; // Assuming the response contains user and tokens
    } catch (error: any) {
        console.error("error while logging", error)
        // Throwing error to be caught in the hook
        throw error.response ? error.response.data : new Error('Network error');
    }
};

// Function to register a new user
export const registerUser = async (fullName: string, email: string, password: string): Promise<any> => {
    console.log("the url", API_URL)
    try {
        const response = await axios.post(`${API_URL}/users/register`, { fullName, email, password });
        console.log('register', response.data)
        return response.data; // Assuming the response contains user and tokens
    } catch (error: any) {
        console.log("error while registering", error)
        // Throwing error to be caught in the hook
        throw error.response ? error.response.data : new Error('Network error');
    }
};


//function to forget the password
export const forgetPassword = async (email: string): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
        console.log('forget', response.data)
        return response.data; // Assuming the response contains user and tokens
    } catch (error: any) {
        console.log("error while forget", error)
        // Throwing error to be caught in the hook
        throw error.response ? error.response.data : new Error('Network error');
    }
}
