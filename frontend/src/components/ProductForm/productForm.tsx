"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IconShoppingBag, IconUpload, IconLoader2 } from "@tabler/icons-react";
import { Product } from "@/types/product";

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: Product) => void; // just send the object
  loading?: boolean;
  error?: string | null;
}

export default function ProductForm({
  initialData,
  onSubmit,
  loading = false,
  error = null,
}: ProductFormProps) {


  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    materials: initialData?.materials?.join(", ") || "",
    createdBy: initialData?.createdBy || "",
    category: initialData?.category || "",
    price: initialData?.price?.toString() || "",
  });

  useEffect(() => {
    if (initialData?.images) {
      const urls = initialData.images.map((img) =>
        typeof img === "string" ? img : URL.createObjectURL(img)
      );
      setPreviews(urls);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      setImages(files);
      setPreviews(files.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass all fields + images to the API handler
    onSubmit({
      ...formData,
      price: Number(formData.price),
      materials: formData.materials.split(",").map((m) => m.trim()),
      images,
    });
  };

  const isEdit = Boolean(initialData);

  return (
    <div className="w-full h-full flex justify-center items-start overflow-y-auto bg-gray-50 p-8">
      <div className="w-full max-w-3xl">
        <Card className="border border-gray-200 shadow-sm rounded-2xl bg-white">
          {!isEdit && (
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconShoppingBag size={24} className="text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Add a new item to your store inventory.
              </p>
            </CardHeader>
          )}

          <form onSubmit={handleSubmit} className="pt-5">
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="grid gap-2">
                <Label htmlFor="title">Product Name</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter product name"
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
                  placeholder="Describe the product..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>

              {/* Images Upload */}
              <div className="grid gap-2">
                <Label htmlFor="images">Product Image(s)</Label>
                <div className="border border-dashed rounded-xl p-5 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <Label
                    htmlFor="images"
                    className="flex flex-col items-center gap-1 cursor-pointer text-blue-600"
                  >
                    <IconUpload size={20} />
                    <span>Upload Images</span>
                  </Label>
                </div>

                {previews.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {previews.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-40 object-cover rounded-xl border"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Materials */}
              <div className="grid gap-2">
                <Label htmlFor="materials">Materials</Label>
                <Input
                  id="materials"
                  name="materials"
                  placeholder="e.g., Cotton, Silk"
                  value={formData.materials}
                  onChange={handleChange}
                />
              </div>

              {/* Created By */}
              <div className="grid gap-2">
                <Label htmlFor="createdBy">Created By</Label>
                <Input
                  id="createdBy"
                  name="createdBy"
                  placeholder="e.g., artisan's username"
                  value={formData.createdBy}
                  onChange={handleChange}
                />
              </div>

              {/* Category */}
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="e.g., Fashion, Home Decor"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Price */}
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm font-medium mt-2">{error}</p>
              )}
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                className="rounded-xl bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <IconLoader2 className="animate-spin" size={18} />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <IconShoppingBag size={18} />
                    <span>{isEdit ? "Update Product" : "Add Product"}</span>
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
