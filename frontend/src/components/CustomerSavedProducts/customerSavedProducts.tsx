"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconHeart } from "@tabler/icons-react";
import { useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import useProduct from "@/hooks/useProduct";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function SavedProducts() {
  const { getUserSavedProductsHandler, toggleSavingProductHandler } = useProduct();
  const savedProducts = useSelector((state: RootState) => state.savedProduct.savedProducts);
  const user = useSelector((state: RootState) => state.user.user?.user); // from cookie (AuthResponse.user)

  // Fetch saved products on mount
  useEffect(() => {
    if (savedProducts.length === 0) {
      getUserSavedProductsHandler();
    }
  }, [getUserSavedProductsHandler, savedProducts.length]);

  // 🧠 Handle save/unsave toggle
  const handleToggleSave = async (productId: string) => {
    try {
      const res = await toggleSavingProductHandler(productId);
      console.log("Toggled save product:", res);
    } catch (error) {
      console.error("Error toggling save product:", error);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {savedProducts.map((item) => {
          const isSaved = user?.savedProducts?.includes(item._id);

          return (
            <Card
              key={item._id}
              className="group border bg-white/95 backdrop-blur-xl rounded-xl shadow-sm hover:shadow-xl transition-all"
            >
              {/* Product Image */}
              <div className="relative h-44 w-full overflow-hidden rounded-t-xl">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Save / Unsave Button */}
                <button
                  onClick={() => handleToggleSave(item._id)}
                  className="absolute top-4 right-4 z-20 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full p-2 hover:scale-110 transition-transform duration-200"
                  aria-label={isSaved ? "Unsave Product" : "Save Product"}
                >
                  {isSaved ? (
                    <BookmarkCheck size={22} className="text-indigo-600 dark:text-emerald-400" />
                  ) : (
                    <Bookmark size={22} className="text-neutral-600 dark:text-neutral-300" />
                  )}
                </button>
              </div>

              {/* Product Content */}
              <CardContent className="p-4 space-y-3">
                <Badge className="bg-amber-100 text-amber-800 font-medium">
                  {item.category}
                </Badge>

                <h3 className="font-semibold text-lg leading-tight line-clamp-2">{item.title}</h3>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-indigo-700">${item.price}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = `/product-details/${item.slug}`}
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Empty State */}
        {savedProducts.length === 0 && (
          <div className="text-center text-gray-500 col-span-full py-20">
            <IconHeart size={36} className="mx-auto mb-3 text-gray-400" />
            <p className="text-lg font-medium">No saved items yet</p>
            <p className="text-sm text-gray-400">Start adding favorites ❤️</p>
          </div>
        )}
      </div>
    </div>
  );
}
