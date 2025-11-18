"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import useBlog from "@/hooks/useblog";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

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
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-orange-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 text-gray-900 dark:text-gray-100">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Link
          href="/blog"
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-orange-600 transition-colors mb-6 w-fit"
        >
          <IconArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
        </Link>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-t-yellow-600 border-gray-300 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <p className="text-center text-red-500">Failed to load blog.</p>
        )}

        {/* Blog Content */}
        {blog && (
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-neutral-800"
          >
            {/* Image Banner */}
            {blog.blog.image && (
              <div className="relative h-[400px] w-full">
                <Image
                  src={blog.blog.image}
                  alt={blog.blog.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="px-4 py-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-sm rounded-full font-medium shadow-md">
                    {blog.blog.badge}
                  </span>
                  <h1 className="text-3xl text-white md:text-5xl font-bold mt-3 drop-shadow-md leading-tight">
                    {blog.blog.title}
                  </h1>
                </div>
              </div>
            )}

            {/* Article Body */}
            <div className="p-8 md:p-12 prose prose-lg dark:prose-invert max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: blog.blog.description }}
              />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-neutral-800 my-6 mx-8"></div>

            {/* Footer / Call to Action */}
            <div className="px-8 pb-10 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Inspired by Ethiopia’s timeless crafts? Explore more stories
                celebrating artisans and traditions.
              </p>
              <Link
                href="/blog"
                className="inline-block mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-medium shadow-lg hover:shadow-xl transition-transform hover:scale-105"
              >
                Discover More
              </Link>
            </div>
          </motion.article>
        )}

        {/* Empty State */}
        {!loading && !error && !blog && (
          <p className="text-center mt-10 text-gray-500">
            No blog content available.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogDetailPage;
