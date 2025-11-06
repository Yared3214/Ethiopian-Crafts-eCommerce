"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useProduct from "@/hooks/useProduct";
import { showToast } from "nextjs-toast-notify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { UpdateProductDialog } from "../UpdateProduct/updateProduct";

export default function ProductManager() {
  const { fetchProductsHandler, deleteProductHandler, error, loading } = useProduct();
  const products = useSelector((state: RootState) => state.product.products);

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Extract categories dynamically from fetched products
  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(unique)];
  }, [products]);

  // Fetch products on mount
  useEffect(() => {
    if (products.length === 0) fetchProductsHandler();
  }, []);

  // Filter products by search query and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const onDelete = async (id: string) => {
    try {
      const result = await deleteProductHandler(id);
      console.log("Delete result:", result);
      if (result?.success === "true") {
        await fetchProductsHandler();
        showToast.success("Product deleted successfully!", {
          duration: 4000,
          position: "bottom-right",
        });
      } else {
        showToast.error("Failed to delete product.", {
          duration: 4000,
          position: "bottom-right",
        });
      }
    } catch (err: any) {
      console.error("Error deleting product:", err);
      showToast.error("Something went wrong while deleting the product.", {
        duration: 4000,
        position: "bottom-right",
      });
    }
  };

  const handleDelete = async (id: string) => {
    setLoadingId(id);
    await onDelete(id);
    setLoadingId(null);
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Products</h1>
          <p className="text-sm text-gray-500">Search, filter, update & delete products</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <IconSearch className="absolute left-2 top-2.5 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="pl-9 w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full py-20 col-span-full">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue-600 mt-4 font-medium">Fetching products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full py-20 col-span-full text-center">
            <h3 className="mt-6 text-lg font-semibold text-gray-700">No products found</h3>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters.</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Card key={product._id} className="rounded-2xl shadow-sm bg-white overflow-hidden">
              {/* Image */}
              <div className="relative h-40 w-full">
                {product.images.length > 0 && (
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <CardHeader>
                <h3 className="text-lg font-semibold leading-tight line-clamp-2">{product.title}</h3>
                <p className="text-xs text-gray-500">{product.category}</p>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                <div className="flex gap-2 justify-end">
                  <UpdateProductDialog product={product} />

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
                          Are you sure you want to delete this product? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(product._id)}
                          className="rounded-xl"
                        >
                          {loadingId === product._id ? "Deleting..." : "Delete"}
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
