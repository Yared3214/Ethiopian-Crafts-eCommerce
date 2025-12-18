// src/api/user/userAPI.ts

import axios from 'axios';
import { AuthResponse, User } from '../../types/user';
import store from '@/store/store';
import { ProductResponse } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper to safely extract error message
const parseAxiosError = (error: unknown): string | object => {
    if (axios.isAxiosError(error)) {
      return error.response?.data || error.message;
    }
    return 'Network error';
  };

interface RegisterUserResponse {
    success: boolean;
    message: string;
}

interface ForgetPasswordResponse {
    message: string;
}

interface ResetPasswordResponse {
    message: string;
}

interface SaveFcmTokenResponse {
    success: boolean;
    message: string;
    updatedUser: User;
}

interface ToggleActivateUserResponse {
    status: string;
    message: string;
    user: User;
}

export interface ToggleSavingProductResponse {
    success: boolean;
    message: string;
    savedProducts: string[];
    populatedSavedProducts: ProductResponse[];
}

// Function to log in a user
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        console.log("login response", response.data)
        return response.data; // Assuming the response contains user and tokens
    } catch (error: unknown) {
        console.error("error while logging", error)
        // Throwing error to be caught in the hook
        throw parseAxiosError(error);
    }
};

// Function to register a new user
export const registerUser = async (fullName: string, email: string, password: string): Promise<RegisterUserResponse> => {
    console.log("the url", API_URL)
    try {
        const response = await axios.post(`${API_URL}/users/register`, { fullName, email, password });
        console.log('register', response.data)
        return response.data; // Assuming the response contains user and tokens
    } catch (error: unknown) {
        console.log("error while registering", error)
        // Throwing error to be caught in the hook
        throw parseAxiosError(error);
    }
};


//function to forget the password
export const forgetPassword = async (email: string): Promise<ForgetPasswordResponse> => {
    try {
        const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
        console.log('forget', response.data)
        return response.data; // Assuming the response contains user and tokens
    } catch (error: unknown) {
        console.log("error while forget", error)
        // Throwing error to be caught in the hook
        throw parseAxiosError(error);
    }
}


//function to reset the password
export const resetPassword = async (token: string, password: string): Promise<ResetPasswordResponse> => {
    try {
        const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, { password });
        console.log('reset', response.data)
        return response.data; // Assuming the response contains user and tokens
    } catch (error: unknown) {
        console.log("error while reset", error)
        // Throwing error to be caught in the hook
        throw parseAxiosError(error);
    }
}

export const saveFcmToken = async (fcmToken: string): Promise<SaveFcmTokenResponse> => {
    try {
        const token = store.getState().user.user?.tokens.access.token;
        if(!token) throw new Error("User is not authenticated");
        const response = await axios.put(`${API_URL}/users/save-fcmToken`, { fcmToken }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        console.log('save fcm token', response.data)
        return response.data; // Assuming the response contains a success message
    } catch (error: unknown) {
        console.log("error while saving fcm token", error)
        // Throwing error to be caught in the hook
        throw parseAxiosError(error);
    }
}

export const getAllUsers = async(): Promise<User[]> => {
    try {
        const token = store.getState().user.user?.tokens.access.token;
        if(!token) throw new Error("User is not authenticated");

        const response = await axios.get(`${API_URL}/users/get/all`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data.users;
    } catch (error: unknown) {
        console.log("error while getting users", error)
        // Throwing error to be caught in the hook
        throw parseAxiosError(error);
    }
}

export const toggleActivateUser = async(userId: string): Promise<ToggleActivateUserResponse> => {
    try {
        const token = store.getState().user.user?.tokens.access.token;
        if(!token) throw new Error("User is not authenticated");

        const response = await axios.post(`${API_URL}/users/toggle-activate/${userId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error: unknown) {
        console.log("error while toggle activating user", error)
        // Throwing error to be caught in the hook
        throw parseAxiosError(error);
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
    } catch (error: unknown) {
        console.log("error while getting saved products", error)
        // Throwing error to be caught in the hook
        throw parseAxiosError(error);
    }
}

export const toggleSavingProduct = async (productId: string): Promise<ToggleSavingProductResponse> => {
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
    } catch (error: unknown) {
      console.log("error while saving product", error);
      throw parseAxiosError(error);
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
    } catch (error: unknown) {
        console.log("error while completing your profile", error);
        throw parseAxiosError(error);
    }
}