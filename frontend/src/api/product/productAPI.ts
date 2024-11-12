import axios from 'axios';
import { Product , ProductWithDetails} from '../../types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get(`${API_URL}/product`);
        console.log("product response", response.data);
        return response.data.products as Product[]; // Type assertion to Product[]
    } catch (error: any) {
        console.error("error while getting all products", error);
        // Throwing error to be caught in the hook
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const fetchAsingleProduct = async (slug: string): Promise<ProductWithDetails> => {
    try {
        const response = await axios.get(`${API_URL}/product/single/${slug}`);
        return response.data.data as ProductWithDetails; // Type assertion to Product
    } catch (error: any) {
        console.error("error while getting single product", error);
        // Throwing error to be caught in the hook
        throw error.response ? error.response.data : new Error('Network error');
    }
};
