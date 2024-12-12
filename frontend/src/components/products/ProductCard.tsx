"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { Product } from "@/types/product";
import AddtoCart from '@/components/AddToCart/addToCart';


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  return (
    <CardContainer className="w-full">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-4 sm:p-6 border">
        <CardItem
          translateZ="50"
          className="text-lg sm:text-xl font-bold text-neutral-600 dark:text-white"
        >
          {product.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm sm:text-base mt-2 dark:text-neutral-300 line-clamp-2 font-serif italic"
        >
          {product.description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={product.images[0]}
            height={400}
            width={400}
            className="h-48 sm:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={`Image of ${product.title}`}
          />
        </CardItem>
        <div className="flex justify-between items-center mt-6">
          <CardItem
            translateZ={20}
            as={Link}
            href={`/product-details/${product.slug}`}
            className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-normal dark:text-white hover:text-indigo-600 transition-colors"
          >
            View Details →
          </CardItem>
          {/* <CardItem
            translateZ={20}
            as="button"
            className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg bg-black dark:bg-white dark:text-black text-white text-xs sm:text-sm font-bold hover:shadow-lg hover:scale-105 hover:bg-black/80 transition-all duration-300"
          >
            Add to Cart
          </CardItem> */}

          <AddtoCart product={product} />

        </div>
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
