import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { Blog } from '@/types/blog';
import {
  fetchBlogs,
  fetchSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog
} from '@/api/blog/blogAPI';
import { setBlogs } from '@/store/feature/blog/blogSlice';

const useBlog = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Fetch all blogs
  const fetchBlogsHandler = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchBlogs(); // Expecting Blog[]
      console.log("Fetched blogs:", data);
      dispatch(setBlogs(data));
      return data;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch blogs";
      setError(message);
    } finally {
      setLoading(false);
    }
  },[dispatch]);

  // ✅ Fetch single blog by slug
  const fetchBlogBySlugHandler = useCallback(async (slug: string) => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchSingleBlog(slug); // Expecting Blog
      console.log("Fetched single blog:", data);
      return data;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch blog";
      setError(message);
    } finally {
      setLoading(false);
    }
  },[]);

  // ✅ Create new blog
  const createBlogHandler = async (blogData: Blog) => {
    setError(null);
    setLoading(true);
    try {
      const data = await createBlog(blogData); // Expecting Blog
      console.log("Created blog:", data);
      return data;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create blog";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update existing blog
  const updateBlogHandler = async (slug: string, blogData: Partial<Blog>) => {
    setError(null);
    setLoading(true);
    try {
      const updatedBlog = await updateBlog(slug, blogData); // Expecting Blog
      console.log("Updated blog:", updatedBlog);
      return updatedBlog;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update blog";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogHandler = async (slug: string) => {
    // Implement delete blog logic similarly
    setError(null);
    setLoading(true);
    try {
      const deletedBlog = await deleteBlog(slug); // Expecting Blog
      console.log("Deleted blog:", deletedBlog);
      return deletedBlog;
    } 
    catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete blog";
      setError(message);
    } finally {
      setLoading(false);
    }
  };


  return {
    error,
    loading,
    fetchBlogsHandler,
    fetchBlogBySlugHandler,
    createBlogHandler,
    updateBlogHandler,
    deleteBlogHandler,
  };
};

export default useBlog;
