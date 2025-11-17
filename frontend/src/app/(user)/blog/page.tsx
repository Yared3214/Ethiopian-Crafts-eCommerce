"use client";

import React, { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { RootState } from "@/store/store";
import useBlog from "@/hooks/useblog";
import { useSelector } from "react-redux";
import { IconArrowWaveRightUp } from "@tabler/icons-react";
import { BlogSkeleton } from '@/components/BlogSkeleton/BlogSkelton';
import * as cheerio from 'cheerio';


const BlogPage: React.FC = () => {
  const { fetchBlogsHandler, error, loading } = useBlog();
  const blogs = useSelector((state: RootState) => state.blog.blogs);

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch blogs on mount
  useEffect(() => {
    fetchBlogsHandler();
  }, []);

  // const categories = Array.from(
  //   new Set(sampleBlogs.map((blog) => blog.category || "Uncategorized"))
  // );

  // Categories derived from blog data
  const categories = Array.from(
    new Set(blogs.map((blog) => blog.category || "Uncategorized"))
  );

  // const filteredBlogs =
  //   selectedCategory === null
  //     ? sampleBlogs
  //     : sampleBlogs.filter((blog) => blog.category === selectedCategory);

  // Filter blogs by selected category
  const filteredBlogs =
    selectedCategory === null
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Ethiopian Crafts Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
          Explore the vibrant traditions and stories behind Ethiopian crafts and artisans. Find inspiration, cultural insights, and much more.
        </p>
      </div>

      {/* Filter by Category */}
      <div className="relative flex justify-center mb-12">
        <div className="flex flex-wrap gap-4 items-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 text-sm md:text-base rounded-full transition-all duration-300 shadow-lg ${selectedCategory === null
              ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 text-sm md:text-base rounded-full transition-all duration-300 shadow-lg ${selectedCategory === category
                ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Loader or Blog Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <BlogSkeleton key={index} />  // Display SkeletonCards while loading
          ))
          }
        </div>
      ) : (
        <BentoGrid className="max-w-6xl mx-auto">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((item, i) => {
              const $ = cheerio.load(item.description || '');
              const plainText = $.text().trim().slice(0, 200);

              return (
              <BentoGridItem
                key={i}
                title={item.title}
                description={plainText}
                imageSrc={item.image}
                slug={item.slug}
                icon={<IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />}
                className={i !== 0 && i % 3 === 0 ? "md:col-span-2" : ""}
              />
              )
            })
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No blogs available for the selected category.
            </p>
          )}
        </BentoGrid>
      )}
    </div>
  );
};

export default BlogPage;
