"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { ProductResponse } from "@/types/product";
import AddtoCart from "@/components/AddToCart/addToCart";
import { Bookmark, BookmarkCheck } from "lucide-react"; // TikTok-like save icons
import store from "@/store/store";
import { ToggleSavingProductResponse } from "@/api/user/userAPI";

interface ProductCardProps {
  product: ProductResponse;
  toggleSaveProduct?: (productId: string) => Promise<ToggleSavingProductResponse>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, toggleSaveProduct }) => {
  const [isSaved, setIsSaved] = useState(false);
  const savedProducts = store.getState().user.user?.user.savedProducts;
  
  const checkIfSaved = savedProducts?.includes(product._id) || false;

  useEffect(() => {
    setIsSaved(checkIfSaved);
  }, [product._id, savedProducts, checkIfSaved]);

  const toggleSave = async () => {
    try {
      if(toggleSaveProduct) {
        const res = await toggleSaveProduct(product._id);
        console.log("Toggled save product:", res);
        if (res.success) {
          setIsSaved(!isSaved);
        }
      }
      
    } catch (error) {
      console.error("Error toggling save product:", error);
    }
    
    // optional: handle saving logic to Firestore / localStorage here

  };

  return (
    <CardContainer className="w-full">
      <CardBody className="relative bg-gray-50 group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border border-black/[0.1] w-full h-auto rounded-xl p-4 sm:p-6">
        
        {/* Save Toggle (Top-right Corner) */}
        <button
          onClick={toggleSave}
          className="absolute top-4 right-4 z-20 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full p-2 hover:scale-110 transition-transform duration-200"
          aria-label={isSaved ? "Unsave Product" : "Save Product"}
        >
          {isSaved ? (
            <BookmarkCheck
              size={22}
              className="text-indigo-600 dark:text-emerald-400"
            />
          ) : (
            <Bookmark
              size={22}
              className="text-neutral-600 dark:text-neutral-300"
            />
          )}
        </button>

        {/* Title */}
        <CardItem
          translateZ="50"
          className="text-lg sm:text-xl font-bold text-neutral-600 dark:text-white"
        >
          {product.title}
        </CardItem>

        {/* Description */}
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm sm:text-base mt-2 dark:text-neutral-300 line-clamp-2 font-serif italic"
        >
          {product.description}
        </CardItem>

        {/* Product Image */}
        <CardItem translateZ="100" className="w-full mt-4 relative">
          <Image
            src={product.images[0]}
            height={400}
            width={400}
            className="h-48 sm:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl transition-shadow"
            alt={`Image of ${product.title}`}
          />
        </CardItem>

        {/* Buttons (Details + Add to Cart) */}
        <div className="flex justify-between items-center mt-6">
          <CardItem
            translateZ={20}
            as={Link}
            href={`/product-details/${product.slug}`}
            className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-normal dark:text-white hover:text-indigo-600 transition-colors"
          >
            View Details →
          </CardItem>

          <AddtoCart product={product} />
        </div>

        {/* Price */}
        <CardItem
          translateZ="30"
          as="span"
          className="block mt-4 text-sm sm:text-base font-bold text-neutral-600 dark:text-neutral-300"
        >
          Price: ${product.price}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default ProductCard;
