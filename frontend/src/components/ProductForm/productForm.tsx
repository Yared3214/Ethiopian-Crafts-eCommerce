"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Upload } from "lucide-react";

export interface ProductFormValues {
  title: string;
  description: string;
  createdBy: string;
  category: string;
  price: string;
  slug: string;
  materials: string[];
  images: File[];
}

export default function ProductForm({
  initialData,
  onSubmit,
}: {
  initialData?: Partial<ProductFormValues>;
  onSubmit: (data: ProductFormValues) => void;
}) {
  const [images, setImages] = useState<File[]>(initialData?.images || []);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>(initialData?.materials || [""]);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    createdBy: initialData?.createdBy || "",
    category: initialData?.category || "",
    price: initialData?.price || "",
    slug: initialData?.slug || "",
  });

  useEffect(() => {
    if (initialData?.images && initialData.images.length) {
      const urls = initialData.images.map((file: any) =>
        typeof file === "string" ? file : URL.createObjectURL(file)
      );
      setImagePreviews(urls);
    }
  }, [initialData]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, materials, images });
  };

  const addMaterial = () => setMaterials([...materials, ""]);
  const removeMaterial = (i: number) => setMaterials(materials.filter((_, index) => index !== i));

  const isEdit = Boolean(initialData);

  return (
    <div className="w-full h-full flex justify-center items-start overflow-y-auto bg-gray-50 p-8">
      <div className="w-full max-w-3xl">
        <Card className="border border-gray-200 shadow-sm rounded-2xl bg-white">
          { !isEdit && 
          <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-800">
            Add New Product
          </h2>
          <p className="text-gray-500 text-sm">
          Fill in the product details below.
          </p>
        </CardHeader>
        }
          

          <form onSubmit={submitForm} className="pt-5">
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input name="title" value={formData.title} onChange={handleChange} required />
              </div>

              {/* Description */}
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Images */}
              <div className="grid gap-2">
                <Label>Images</Label>
                <div className="border border-dashed rounded-xl p-4 text-center bg-gray-50">
                  <Input type="file" multiple accept="image/*" id="images" onChange={handleImageChange} className="hidden" />
                  <Label htmlFor="images" className="cursor-pointer text-blue-600 flex items-center justify-center gap-2">
                    <Upload size={18} /> Upload Images
                  </Label>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {imagePreviews.map((src, idx) => (
                      <img key={idx} src={src} className="w-full h-28 object-cover rounded-lg border" />
                    ))}
                  </div>
                )}
              </div>

              {/* Materials */}
              <div className="grid gap-2">
                <Label>Materials</Label>
                {materials.map((mat, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Input value={mat} onChange={(e) => handleMaterialChange(idx, e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={() => removeMaterial(idx)} disabled={materials.length === 1}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addMaterial} className="mt-1">
                  <Plus size={16} /> Add Material
                </Button>
              </div>

              {/* Text fields */}
              {["createdBy", "category", "price", "slug"].map((field) => (
                <div className="grid gap-2" key={field}>
                  <Label>{field}</Label>
                  <Input name={field} value={(formData as any)[field]} onChange={handleChange} required />
                </div>
              ))}
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button type="submit" className="rounded-xl bg-blue-600 text-white">
                {isEdit ? "Update Product" : "Save Product"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
