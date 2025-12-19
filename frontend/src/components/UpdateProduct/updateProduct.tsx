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
import { showToast } from "nextjs-toast-notify";
import ProductForm from "../ProductForm/productForm";
import useProduct from "@/hooks/useProduct";
import { Product, ProductResponse } from "@/types/product";

export function UpdateProductDialog({ product }: { product: ProductResponse }) {
  const [open, setOpen] = useState(false);
  const { fetchProductsHandler, updateProductHandler, loading, error } = useProduct();

  const handleUpdateProduct = async (data: Partial<Product>) => {
    try {
      const result = await updateProductHandler(product._id, data); // ✅ use _id not id

      if (result) {
        await fetchProductsHandler(); // ✅ refresh list after update

        showToast.success("Product updated successfully!", {
          duration: 4000,
          progress: false,
          position: "bottom-right",
          transition: "slideInUp",
          icon: "",
          sound: false,
        });

        setOpen(false); // ✅ close dialog after success
      }
    } catch (err: unknown) {
      console.error("❌ Error updating product:", err);
      showToast.error("Failed to update product", {
        duration: 4000,
        position: "bottom-right",
      });
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
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product details and save changes.
            </DialogDescription>
          </DialogHeader>

          {/* ✅ Product form with pre-filled data */}
          <div className="w-full overflow-y-auto max-h-[75vh]">
            <ProductForm
              initialData={product}
              onSubmit={handleUpdateProduct}
              loading={loading}
              error={error}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
