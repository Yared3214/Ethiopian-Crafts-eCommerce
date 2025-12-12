"use client";

import BlogForm from "../BlogForm/blogForm";
import useBlog from "../../hooks/useblog";
import { showToast } from "nextjs-toast-notify"; // ✅ make sure this is correctly imported
import { Blog } from "@/types/blog";

export default function AddBlog() {
    const { createBlogHandler, loading, error } = useBlog();

    const handleAddBlog = async (data: Blog) => {
        try {
            const result = await createBlogHandler(data);

            if (result) {
                showToast.success("Blog Created Successfully", {
                    duration: 4000,
                    progress: false,
                    position: "bottom-right",
                    transition: "slideInUp",
                    icon: "",
                    sound: false,
                });
            }
        } catch (err: unknown) {
           console.error("❌ Error adding blog:", err);
        }
    };

    return (
        <div className="w-full">
            <BlogForm onSubmit={handleAddBlog} loading={loading} error={error} />
        </div>
    );
}
