"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";

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

import { IconEdit, IconTrash, IconSearch } from "@tabler/icons-react";
import { UpdateBlogDialog } from "../UpdateBlog/updateBlog";


export const demoBlogs: Blog[] = [
    {
      _id: "1",
      title: "The Ultimate Skincare Routine for Glowing Skin",
      description:
        "Discover the perfect skincare routine designed to give you glowing, healthy skin naturally. Includes morning and night routines, essential products, and expert tips.",
      image: "https://cdn.shopify.com/s/files/1/0410/9608/5665/t/3/assets/pf-541b6cd1--Blog-Creative-55.jpg?v=1600941418",
      badge: "Beauty Tips",
      category: "Skincare",
      slug: "ultimate-skincare-routine",
      createdAt: "2024-01-12T10:23:00.000Z",
      updatedAt: "2024-01-12T10:23:00.000Z",
      __v: 0,
    },
    {
      _id: "2",
      title: "Top 10 Ceramic Home Decor Trends in 2025",
      description:
        "From handmade vases to artisan kitchenware, these ceramic decor trends are transforming modern homes. See what's trending for 2025.",
      image: "https://cdn.decorilla.com/online-decorating/wp-content/uploads/2024/08/Living-room-featuring-interior-design-trends-2025-by-Decorilla-1024x574.jpeg?width=900",
      badge: "Home Decor",
      category: "Home Decor",
      slug: "ceramic-decor-trends-2025",
      createdAt: "2024-02-01T14:11:00.000Z",
      updatedAt: "2024-02-01T14:11:00.000Z",
      __v: 0,
    },
    {
      _id: "3",
      title: "Why Handmade Jewelry Is the Next Big Thing",
      description:
        "Handcrafted jewelry is becoming the symbol of uniqueness and slow fashion. Discover why it's trending and where to find the best pieces.",
      image: "https://incrediblethings.com/wp-content/uploads/2020/02/bigstock-Beautiful-Jewelry-Close-up-Br-327795874.jpg",
      badge: "Fashion",
      category: "Jewelry",
      slug: "handmade-jewelry-trend",
      createdAt: "2024-03-08T12:00:00.000Z",
      updatedAt: "2024-03-08T12:00:00.000Z",
      __v: 0,
    },
    {
      _id: "4",
      title: "Natural Haircare Secrets for Strong & Shiny Hair",
      description:
        "Learn about herbs, oils, and practices that strengthen your hair while avoiding harmful chemicals.",
      image: "https://hips.hearstapps.com/hmg-prod/images/wh-x-clairol-lead-copy-1631101507.jpg?crop=0.5xw:1xh;center,top&resize=640:*",
      badge: "Haircare",
      category: "Haircare",
      slug: "natural-haircare-secrets",
      createdAt: "2024-03-15T09:45:00.000Z",
      updatedAt: "2024-03-15T09:45:00.000Z",
      __v: 0,
    },
    {
      _id: "5",
      title: "Minimalist Lifestyle: A Guide to Decluttering Your Home",
      description:
        "Minimalism isn't just a trend — it's a lifestyle. Here's how to simplify your space and boost your mental clarity.",
      image: "https://www.dumpsters.com/images/blog/minimalist-livingroom-1200x600.jpg",
      badge: "Lifestyle",
      category: "Lifestyle",
      slug: "minimalist-lifestyle-guide",
      createdAt: "2024-04-02T15:30:00.000Z",
      updatedAt: "2024-04-02T15:30:00.000Z",
      __v: 0,
    },
  ];
  

export default function BlogManager() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(demoBlogs.map((b) => b.category)))];

//   const filteredBlogs = useMemo(() => {
//     return blogs.filter((blog) => {
//       const matchesSearch =
//         blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         blog.description.toLowerCase().includes(searchQuery.toLowerCase());

//       const matchesCategory =
//         selectedCategory === "All" || blog.category === selectedCategory;

//       return matchesSearch && matchesCategory;
//     });
//   }, [blogs, searchQuery, selectedCategory]);

const filteredBlogs = useMemo(() => {
    return demoBlogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const onDelete = async (id: string) => {
    // Simulate API call delay
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
  };

  const onEdit = (blog: Blog) => {
    console.log("Editing blog:", blog);
  };


  const handleDelete = async (id: string) => {
    setLoadingId(id);
    await onDelete(id);
    setLoadingId(null);
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-6 p-4 ">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Blogs</h1>
          <p className="text-sm text-gray-500">Search, filter, update & delete blogs</p>
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
            className={`px-4 py-2 rounded-xl border text-sm whitespace-nowrap transition ${
              selectedCategory === cat
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
        {filteredBlogs.map((blog) => (
          <Card key={blog._id} className="rounded-2xl shadow-sm bg-white overflow-hidden">
            
            {/* Image */}
            <div className="relative h-40 w-full">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
              />
              <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {blog.badge}
              </span>
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
                <UpdateBlogDialog blog={blog}/>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="rounded-xl px-3">
                      <IconTrash size={18} />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this blog? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-xl">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(blog._id)}
                        className="rounded-xl"
                      >
                        {loadingId === blog._id ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
