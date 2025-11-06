"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import BlogForm from "../BlogForm/blogForm";
import useBlog from "@/hooks/useblog";
import { showToast } from "nextjs-toast-notify";

export function UpdateBlogDialog({ blog }: { blog: any }) {
  const [open, setOpen] = useState(false);
  const { fetchBlogsHandler, updateBlogHandler, loading, error } = useBlog();

  const handleUpdateBlog = async (data: any) => {
    try {
      const result = await updateBlogHandler(blog.slug, data);

      if (result) {
        await fetchBlogsHandler(); // Refresh blog list after update

        showToast.success("Blog updated successfully!", {
          duration: 4000,
          progress: false,
          position: "bottom-right",
          transition: "slideInUp",
          icon: "",
          sound: false,
        });

        setOpen(false); // ✅ close dialog after success
      }
    } catch (err: any) {
      console.error("❌ Error updating blog:", err);
    }
  };

  return (
    <div className="w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="rounded-xl px-3">
            Update
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
            <DialogDescription>
              Update the blog details and save changes.
            </DialogDescription>
          </DialogHeader>

          {/* ✅ Blog form with pre-filled data */}
          <div className="w-full overflow-y-auto max-h-[75vh]">
            <BlogForm
              initialData={blog}
              onSubmit={handleUpdateBlog}
              loading={loading}
              error={error}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
