"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Upload } from "lucide-react";

export default function AddProductForm() {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([""]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    createdBy: "",
    category: "",
    price: "",
    slug: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleMaterialChange = (index: number, value: string) => {
    const updated = [...materials];
    updated[index] = value;
    setMaterials(updated);
  };

  const addMaterialField = () => setMaterials([...materials, ""]);
  const removeMaterialField = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...formData, materials, images });
    alert("Product submitted! Check console for details.");
  };

  return (
    <div className="w-full h-full flex justify-center items-start overflow-y-auto bg-gray-50 p-8">
  <div className="w-full max-w-3xl">
    <Card className="border border-gray-200 shadow-sm rounded-2xl bg-white">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>
          <p className="text-gray-500 text-sm">Fill in the product details below.</p>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Product title"
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
                placeholder="Write a detailed description..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Images */}
            <div className="grid gap-2">
              <Label>Images</Label>
              <div className="border border-dashed rounded-xl p-4 text-center bg-gray-50 hover:bg-gray-100 transition">
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Label
                  htmlFor="images"
                  className="cursor-pointer text-blue-600 flex items-center justify-center gap-2"
                >
                  <Upload size={18} /> Upload Images
                </Label>
              </div>
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {imagePreviews.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Preview ${idx}`}
                      className="w-full h-28 object-cover rounded-lg border"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Materials */}
            <div className="grid gap-2">
              <Label>Materials</Label>
              {materials.map((mat, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Input
                    placeholder="e.g., Cotton, Leather, Steel"
                    value={mat}
                    onChange={(e) => handleMaterialChange(idx, e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMaterialField(idx)}
                    disabled={materials.length === 1}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1 mt-1"
                onClick={addMaterialField}
              >
                <Plus size={16} /> Add Material
              </Button>
            </div>

            {/* Other fields */}
            <div className="grid gap-2">
              <Label htmlFor="createdBy">Created By</Label>
              <Input
                id="createdBy"
                name="createdBy"
                placeholder="Your name"
                value={formData.createdBy}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                placeholder="e.g., Home Decor, Fashion"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="slug">Slug (unique)</Label>
              <Input
                id="slug"
                name="slug"
                placeholder="unique-product-slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button type="submit" className="rounded-xl bg-blue-600 text-white hover:bg-blue-700">
              Save Product
            </Button>
          </CardFooter>
        </form>
      </Card>
      </div>
    </div>
  );
}
