"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IconArticle, IconUpload } from "@tabler/icons-react";

export interface BlogFormValues {
  title: string;
  description: string;
  category: string;
  badge: string;
  slug: string;
  image: File;
}
export default function BlogForm(
  {
    initialData,
    onSubmit,
  }: {
    initialData?: Partial<BlogFormValues>;
    onSubmit: (data: BlogFormValues) => void;
  }
) {
  const [image, setImage] = useState<File>(initialData?.image || {} as File);
  const [preview, setPreview] = useState<string>({} as string);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    badge: initialData?.badge || "",
    category: initialData?.category || "",
    slug: initialData?.slug || "",
  });

  useEffect(() => {
      if (initialData?.image) {
        const url = typeof initialData.image === "string" ? initialData.image : URL.createObjectURL(initialData.image);
        setPreview(url);
      }
    }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, image });
    alert("Blog submitted! Check console for details.");
  };

  const isEdit = Boolean(initialData);

  return (
    <div className="w-full h-full flex justify-center items-start overflow-y-auto bg-gray-50 p-8">
      <div className="w-full max-w-3xl">
        <Card className="border border-gray-200 shadow-sm rounded-2xl bg-white">
          { !isEdit &&
          <CardHeader>
          <div className="flex items-center gap-2">
            <IconArticle size={24} className="text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Add New Blog</h2>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Write a new article and publish it to your blog.
          </p>
        </CardHeader> 
          }
          

          <form onSubmit={handleSubmit} className="pt-5">
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter blog title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Write the blog content..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="grid gap-2">
                <Label htmlFor="image">Cover Image</Label>
                <div className="border border-dashed rounded-xl p-5 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <Label
                    htmlFor="image"
                    className="flex flex-col items-center gap-1 cursor-pointer text-blue-600"
                  >
                    <IconUpload size={20} />
                    <span>Upload Image</span>
                  </Label>
                </div>

                {preview && (
                  <div className="mt-3">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-60 object-cover rounded-xl border"
                    />
                  </div>
                )}
              </div>

              {/* Badge */}
              <div className="grid gap-2">
                <Label htmlFor="badge">Badge</Label>
                <Input
                  id="badge"
                  name="badge"
                  placeholder="e.g., Featured, Trending, Editor's Pick"
                  value={formData.badge}
                  onChange={handleChange}
                />
              </div>

              {/* Category */}
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="e.g., Tech, Design, Lifestyle"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Slug */}
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug (unique)</Label>
                <Input
                  id="slug"
                  name="slug"
                  placeholder="e.g., how-to-build-a-nextjs-app"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                className="rounded-xl bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
              >
                <IconArticle size={18} />
                { isEdit ? 'Update Blog' : 'Publish Blog'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
