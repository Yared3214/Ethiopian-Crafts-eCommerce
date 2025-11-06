import axios from "axios";
import { Blog, BlogResponse } from "../../types/blog";
import store from "../../store/store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Fetch all blogs
export const fetchBlogs = async (): Promise<BlogResponse[]> => {
  try {
    const response = await axios.get(`${API_URL}/blog`);
    console.log("blog responsessss", response.data);
    return response.data.blogs as BlogResponse[];
  } catch (error: any) {
    console.error("Error while getting all blogs", error);
    throw error.response ? error.response.data : new Error("Network error");
  }
};

// ✅ Fetch single blog by slug
export const fetchSingleBlog = async (slug: string): Promise<BlogResponse> => {
  try {
    const response = await axios.get(`${API_URL}/blog/single/${slug}`);
    return response.data as BlogResponse;
  } catch (error: any) {
    console.error("Error while getting single blog", error);
    throw error.response ? error.response.data : new Error("Network error");
  }
};

// ✅ Create new blog
export const createBlog = async (blogData: Blog): Promise<Blog> => {
  try {
    // Get token from Redux store
    const token = store.getState().user.user?.tokens.access.token;
    if (!token) throw new Error("User is not authenticated");

    const formData = new FormData();

    // Append required fields
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    formData.append("badge", blogData.badge);
    formData.append("category", blogData.category);

    // Append exactly one image (File)
    formData.append("image", blogData.image);

    // Send request
    const response = await axios.post(`${API_URL}/blog/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.blog as Blog; // backend returns { status, message, blog }
  } catch (error: any) {
    console.error("Error creating blog:", error);
    throw error.response ? error.response.data : new Error("Network error");
  }
};

// ✅ Update existing blog
export const updateBlog = async (
  slug: string,
  blogData: Partial<Blog>
): Promise<Blog> => {
  try {
    // Get token from Redux store
    const token = store.getState().user.user?.tokens.access.token;
    if (!token) throw new Error("User is not authenticated");

    const formData = new FormData();

    // Append fields only if they exist (allows partial updates)
    if (blogData.title) formData.append("title", blogData.title);
    if (blogData.description) formData.append("description", blogData.description);
    if (blogData.badge) formData.append("badge", blogData.badge);
    if (blogData.category) formData.append("category", blogData.category);

    // Handle image — if it’s a File, append it
    if (blogData.image instanceof File) {
      formData.append("image", blogData.image);
    }

    // Send PUT request
    const response = await axios.put(`${API_URL}/blog/update/${slug}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.blog as Blog; // backend should return updated blog
  } catch (error: any) {
    console.error("Error updating blog:", error);
    throw error.response ? error.response.data : new Error("Network error");
  }
};


//delete blog by slug
export const deleteBlog = async (slug: string): Promise<any> => {
  try {
    // Get token from Redux store
    const token = store.getState().user.user?.tokens.access.token;
    if (!token) throw new Error("User is not authenticated");
    const response = await axios.delete(`${API_URL}/blog/delete/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // backend should return deleted blog
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    throw error.response ? error.response.data : new Error("Network error");
  }
}
