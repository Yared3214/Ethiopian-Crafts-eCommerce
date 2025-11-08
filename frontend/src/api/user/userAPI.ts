// src/api/user/userAPI.ts

import axios from 'axios';
import { AuthResponse, User } from '../../types/user';
import store from '@/store/store';
import { ProductResponse } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("api url", API_URL)
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


//function to reset the password
export const resetPassword = async (token: string, password: string): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, { password });
        console.log('reset', response.data)
        return response.data; // Assuming the response contains user and tokens
    } catch (error: any) {
        console.log("error while reset", error)
        // Throwing error to be caught in the hook
        throw error.response ? error.response.data : new Error('Network error');
    }
}

export const getUserSavedProducts = async (): Promise<ProductResponse[]> => {
    try {
        const token = store.getState().user.user?.tokens.access.token;
        if (!token) throw new Error("User is not authenticated");

        const response = await axios.get(
            `${API_URL}/users/saved-products`,
            {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              },

        );
        console.log('saved products', response.data)
        return response.data.savedProducts; // Assuming the response contains savedProducts array
    } catch (error: any) {
        console.log("error while getting saved products", error)
        // Throwing error to be caught in the hook
        throw error.response ? error.response.data : new Error('Network error');
    }
}

export const toggleSavingProduct = async (productId: string): Promise<any> => {
    try {
      const token = store.getState().user.user?.tokens.access.token;
      if (!token) throw new Error("User is not authenticated");
  
      const response = await axios.post(
        `${API_URL}/users/toggle-save-product/${productId}`,
        {}, // empty request body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("saved product", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error while saving product", error);
      throw error.response ? error.response.data : new Error("Network error");
    }
}

export const completeProfile = async(completeProfileData: Partial<User>) => {
    try {
        const token = store.getState().user.user?.tokens.access.token;
        if (!token) throw new Error("User is not authenticated");

        console.log("completeProfileData: ", completeProfileData);

        const response = await axios.post(`${API_URL}/users/complete-profile`, completeProfileData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('completed profile: ', response.data)
        return response.data;
    } catch (error: any) {
        console.log("error while completing your profile", error);
        throw error.response ? error.response.data : new Error("Network error");
    }
}