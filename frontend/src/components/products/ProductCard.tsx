import React from 'react';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    slug: string;
    name: string;
    price: number;
    image: string;
    description: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border border-yellow-500 bg-white p-4 rounded-md shadow-lg transition-transform duration-300 hover:shadow-2xl hover:scale-105 transform hover:bg-amber-50">
      {/* Product Image */}
      <div className="overflow-hidden rounded-md">
        <img
          src={product.image}
          alt={`Image of ${product.name}`}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Product Title with Link */}
      <Link href={`/product-details/${product.slug}`}>
        <h3 className="text-2xl line-clamp-1 font-semibold mt-4 cursor-pointer hover:underline transition-colors duration-300 font-serif text-gray-800 hover:text-red-600">
          {product.name}
        </h3>
      </Link>

      {/* Product Description */}
      <p className="text-sm text-gray-700 mt-2 line-clamp-3 font-serif italic">
        {product.description}
      </p>

      {/* Product Price */}
      <p className="text-lg font-bold text-red-700 mt-4 font-mono tracking-wide">
        ${product.price}
      </p>
    </div>
  );
};

export default ProductCard;
