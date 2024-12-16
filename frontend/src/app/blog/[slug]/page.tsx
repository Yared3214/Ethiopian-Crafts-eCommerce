"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/ui/tracing-beam";
import useBlog from "@/hooks/useblog";
import { useParams } from "next/navigation";

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams() as { slug: string };
  const { fetchBlogBySlugHandler, error, loading } = useBlog();

  // Blog state
  const [blog, setBlog] = useState<any>(null);

  // Fetch blog on mount or slug change
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setBlog(null); // Reset blog state while fetching
        const fetchedBlog = await fetchBlogBySlugHandler(slug);
        setBlog(fetchedBlog);
      } catch (err) {
        console.error("Error fetching blog:", err);
        // Optionally, handle error state here if needed
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, []);

  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {/* Loading State */}
        {loading && (
          <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-black transition-opacity duration-300">
            <div className="w-10 h-10 border-4 border-t-gray-800 border-gray-300 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <p className="text-center text-red-500">
            Failed to load blog. Please try again.
          </p>
        )}

        {/* Blog Content */}
        {!loading && !error && blog && (
          <div className="transition-opacity duration-500 ease-in opacity-100">
            <div className="mb-10">
              <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                {blog?.blog?.badge}
              </h2>

              <p className={twMerge("text-xl mb-4")}>{blog?.blog?.title}</p>

              <div className="text-sm prose prose-sm dark:prose-invert">
                {blog?.blog?.image && (
                  <Image
                    src={blog.blog.image}
                    alt="blog thumbnail"
                    height={1000}
                    width={1000}
                    className="rounded-lg mb-10 object-cover"
                  />
                )}
                {blog?.blog?.description}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && !blog && (
          <p className="text-center">No blog content available.</p>
        )}
      </div>
    </TracingBeam>
  );
};

export default BlogDetailPage;
