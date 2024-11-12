import axios from 'axios'
import { ArtisanResponse } from '@/types/artisan'

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const fetchArtisan = async (slug: string): Promise<ArtisanResponse> => {
    try {
        const response = await axios.get(`${API_URL}/artisan/${slug}`);
        return response.data.data as ArtisanResponse;
    } catch (error: any) {
        console.error('error while getting an artian', error);
        throw error.response ? error.response.data : new Error('Network error');
    }
}