import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { useState } from "react"
import BlogForm from "../BlogForm/blogForm";
  
  export function UpdateBlogDialog({ blog }: { blog: any }) {
    const [open, setOpen] = useState(false)
    const handleUpdateBlog = (data: any) => {
        // Logic to update product
        console.log("Blog updated:", data);
    };
  
    return (
        <div className="w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="rounded-xl px-3">Update</Button>
        </DialogTrigger>
  
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
            <DialogDescription>
              Update Blog details and save changes.
            </DialogDescription>
          </DialogHeader>
  
          {/* ✅ Your product form with existing data */}
          <div className="w-full overflow-y-auto max-h-[75vh]">
            <BlogForm initialData={blog} onSubmit={handleUpdateBlog} />
        </div>
        </DialogContent>
      </Dialog>
      </div>
    )
  }
  