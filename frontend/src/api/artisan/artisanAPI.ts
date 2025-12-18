import axios from 'axios'
import { Artisan, ArtisanResponse, ArtisansResponse } from '@/types/artisan'
import store from '@/store/store';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper to safely extract error message
const parseAxiosError = (error: unknown): string | object => {
    if (axios.isAxiosError(error)) {
      return error.response?.data || error.message;
    }
    return 'Network error';
  };

interface UpdateResponse {
    status: string;
    message?: string;
    updatedArtisan: ArtisansResponse;
}

interface ToggleResponse {
    status: string;
    message: string;
    artisan: ArtisansResponse;
}

export const fetchArtisan = async (slug: string): Promise<ArtisanResponse> => {
    try {
        const response = await axios.get(`${API_URL}/artisan/${slug}`);
        return response.data.data as ArtisanResponse;
    } catch (error: unknown) {
        console.error('error while getting an artian', error);
        throw parseAxiosError(error);
    }
}

export const fetchArtisans = async() => {
    try {
        const response = await axios.get(`${API_URL}/artisan/get/all`);
        return response.data.artisans as ArtisansResponse[];
    } catch (error: unknown) {
        console.error('error while getting all artians', error);
        throw parseAxiosError(error);
    }
}

export const createArtisans = async(ArtisanData: Artisan) => {
    try {
        const token = store.getState().user.user?.tokens.access.token;
        if (!token) throw new Error("User is not authenticated");

        const response = await axios.post(`${API_URL}/artisan/create`, ArtisanData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
        });
        return response.data;
    } catch (error: unknown) {
        console.error('error while getting all artians', error);
        throw parseAxiosError(error);
    }
}

export const updateArtisanBySlug = async(slug: string, ArtisanData: Partial<Artisan> | FormData): Promise<UpdateResponse> => {
    try {
        const token = store.getState().user.user?.tokens.access.token;
        if(!token) throw new Error("User is not authenticated");

        const response = await axios.put(`${API_URL}/artisan/update/${slug}`, ArtisanData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }  catch (error: unknown) {
        console.error('error while updating artian', error);
        throw parseAxiosError(error);
    }
}
export const toggleActivateUser = async(userId: string): Promise<ToggleResponse> => {
    try {
            const token = store.getState().user.user?.tokens.access.token;
            if(!token) throw new Error("User is not authenticated");
    
            const response = await axios.post(`${API_URL}/artisan/toggle-activate/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            return response.data;
        } catch (error: unknown) {
            console.log("error while toggle activating artisan", error)
            // Throwing error to be caught in the hook
            throw parseAxiosError(error);
        }
}