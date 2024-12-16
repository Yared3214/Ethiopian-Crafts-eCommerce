import axios from 'axios';
import { Blog} from '../../types/blog';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchBlogs = async (): Promise<Blog[]> => {
    try {
        const response = await axios.get(`${API_URL}/blog`);
        console.log("blog response", response.data);
        return response.data.blogs as []; // Type assertion to Product[]
    } catch (error: any) {
        console.error("error while getting all blogs", error);
        // Throwing error to be caught in the hook
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const fetchSingleBlog = async (slug: string): Promise<Blog> => {
    try {
        const response = await axios.get(`${API_URL}/blog/single/${slug}`);
        return response.data as Blog; // Type assertion to Product
    } catch (error: any) {
        console.error("error while getting single blog", error);
        // Throwing error to be caught in the hook
        throw error.response ? error.response.data : new Error('Network error');
    }
};
