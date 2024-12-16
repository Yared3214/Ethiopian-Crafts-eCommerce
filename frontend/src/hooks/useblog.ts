import { useDispatch } from 'react-redux';
import { Blog } from '@/types/blog';
import { useState } from 'react';
import { fetchBlogs, fetchSingleBlog } from '@/api/blog/blogAPI';
import { setBlogs } from '@/store/feature/blog/blogSlice';

const useBlog = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchBlogsHandler = async () => {
        setError(null);
        setLoading(true);  // Set loading to true before fetching
        try {
            const data = await fetchBlogs();  // Expecting an array of Blog
            console.log("the blog data", data)
            dispatch(setBlogs(data));  // Dispatching the array to setBlogs
            return data;
        } catch (error) {
            setError((error as any).message || 'Failed to fetch blogs');
        } finally {
            setLoading(false);  // Set loading to false after fetching
        }
    };

    const fetchBlogBySlugHandler = async (slug: string) => {
        setError(null);
        setLoading(true);  // Set loading to true before fetching
        try {
            const data = await fetchSingleBlog(slug);  // Expecting a Blog object
            console.log("feeeeeeeeeeeeetched daaaata")
            return data;
        } catch (error) {
            setError((error as any).message || 'Failed to fetch blog');
        } finally {
            setLoading(false);  // Set loading to false after fetching
        }
    };

    return { error, loading, fetchBlogsHandler, fetchBlogBySlugHandler };
};

export default useBlog;
