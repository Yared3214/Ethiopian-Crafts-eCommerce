"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useBlog from "@/hooks/useblog";
import { showToast } from "nextjs-toast-notify"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { IconTrash, IconSearch } from "@tabler/icons-react";
import { UpdateBlogDialog } from "../UpdateBlog/updateBlog";

export default function BlogManager() {
  const { fetchBlogsHandler, deleteBlogHandler, loading } = useBlog();
  const blogs = useSelector((state: RootState) => state.blog.blogs);

  // Fetch blogs on mount
  useEffect(() => {
    fetchBlogsHandler();
  }, [fetchBlogsHandler]);

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract categories dynamically from fetched blogs
  const categories = useMemo(() => {
    const unique = new Set(blogs.map((b) => b.category));
    return ["All", ...Array.from(unique)];
  }, [blogs]);

  // Filter blogs based on search and category
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, selectedCategory]);

  // Simulated delete function
  const onDelete = async (slug: string) => {
    try {
      const result = await deleteBlogHandler(slug);

      if (result?.status === "success") {
        await fetchBlogsHandler(); // Refresh blog list after deletion
        showToast.success("Blog deleted successfully!", {
          duration: 4000,
          progress: false,
          position: "bottom-right",
          transition: "slideInUp",
          icon: "",
          sound: false,
        });
      } else {
        showToast.error("Failed to delete blog.", {
          duration: 4000,
          position: "bottom-right",
        });
      }
    } catch (err: unknown) {
      console.error("❌ Error deleting blog:", err);
      showToast.error("Something went wrong while deleting the blog.", {
        duration: 4000,
        position: "bottom-right",
      });
    }
  };

  const handleDelete = async (slug: string) => {
    setLoadingId(slug);
    await onDelete(slug);
    setLoadingId(null);
  };


  return (
    <div className="flex-1 overflow-y-auto space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Blogs</h1>
          <p className="text-sm text-gray-500">
            Search, filter, update & delete blogs
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <IconSearch className="absolute left-2 top-2.5 h-5 w-5 text-gray-500" />
          <Input
            placeholder="Search blogs..."
            className="pl-9 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl border text-sm whitespace-nowrap transition ${selectedCategory === cat
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          // ✨ Modern animated loader
          <div className="flex flex-col items-center justify-center w-full py-20 col-span-full">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue-600 mt-4 font-medium">Fetching awesome blogs...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          // 🌿 Friendly empty state
          <div className="flex flex-col items-center justify-center w-full py-20 col-span-full text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 9l4-4m0 0l4 4m-4-4v12"
                />
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-gray-700">
              No blogs found
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Try adjusting your search or filters to discover more blogs.
            </p>
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <Card
              key={blog.slug}
              className="rounded-2xl shadow-sm bg-white overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-40 w-full">
                <Image
                  src={
                    typeof blog.image === "string"
                      ? blog.image // fetched blog -> image URL
                      : URL.createObjectURL(blog.image) // local File when adding
                  }
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
                {blog.badge && (
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {blog.badge}
                  </span>
                )}
              </div>

              <CardHeader>
                <h3 className="text-lg font-semibold leading-tight line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-xs text-gray-500">{blog.category}</p>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {blog.description}
                </p>

                <div className="flex gap-2 justify-end">
                  <UpdateBlogDialog blog={blog} />

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="rounded-xl px-3"
                      >
                        <IconTrash size={18} />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this blog? This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(blog.slug ?? '')}
                          className="rounded-xl"
                        >
                          {loadingId === blog.slug ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
