"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import useProduct from "@/hooks/useProduct";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
export default function SavedProducts() {

  const { loading, error, getUserSavedProductsHandler, toggleSavingProductHandler } = useProduct();
  const savedProducts = useSelector((state: RootState) => state.savedProduct.savedProducts);

  useEffect(() => {
    if (savedProducts.length === 0) {
      getUserSavedProductsHandler();
    }
  }, []);

  // const toggleSave = async(id: string) => {
  //   try {
  //     const res = await toggleSavingProductHandler(product._id) as any;
  //     console.log("Toggled save product:", res);
  //     if (res.success) {
  //       setIsSaved(!isSaved);
  //     }
  //   } catch (error) {
  //     console.error("Error toggling save product:", error);
  //   }
  // };




  return (
    <div className="flex-1 overflow-y-auto p-6">
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {savedProducts.map((item) => (
        <Card
          key={item._id}
          className="group border bg-white/95 backdrop-blur-xl rounded-xl shadow-sm hover:shadow-xl transition-all"
        >
          {/* Image */}
          <div className="relative h-44 w-full overflow-hidden rounded-t-xl">
            <Image
              src={item.images[0]}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Heart button */}
            <button
              onClick={() => console.log('item saved')}
              className="absolute top-3 right-3 bg-white rounded-full p-1 shadow hover:scale-105 transition"
            >
              <IconHeartFilled
                className="text-rose-500 group-hover:animate-pulse"
                size={18}
              />
            </button>
          </div>

          {/* Content */}
          <CardContent className="p-4 space-y-3">
            <Badge className="bg-amber-100 text-amber-800 font-medium">
              {item.category}
            </Badge>

            <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>

            <div className="flex justify-between items-center">
              <span className="font-bold text-indigo-700">{item.price}</span>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

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
