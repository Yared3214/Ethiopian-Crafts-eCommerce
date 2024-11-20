import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import ProductSkelton from '../Loader/ProductSkeleton';
import { BsCartPlus } from 'react-icons/bs';

interface ProductCardProps {
  product: Product;
  loading: boolean;
  // onAddToCart: (product: Product) => void; // Function to handle adding to cart
}

const ProductCard: React.FC<ProductCardProps> = ({ product, loading }) => {



  if (loading) {
    return <ProductSkelton />;
  }

  return (
    <div className="border border-yellow-500 bg-white p-4 rounded-md shadow-lg transition-transform duration-300 hover:shadow-2xl hover:scale-105 transform hover:bg-amber-50">
      {/* Product Image */}
      <div className="overflow-hidden rounded-md">
        <img
          src={product.images[0]}
          alt={`Image of ${product.title}`}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Product Title with Link */}
      <Link href={`/product-details/${product.slug}`}>
        <h3 className="text-2xl line-clamp-1 font-semibold mt-4 cursor-pointer hover:underline transition-colors duration-300 font-serif text-gray-800 hover:text-red-600">
          {product.title}
        </h3>
      </Link>

      {/* Product Description */}
      <p className="text-sm text-gray-700 mt-2 line-clamp-1 font-serif italic">
        {product.description}
      </p>

      {/* Product Price */}
      <p className="text-lg font-bold text-red-700 mt-4 font-mono tracking-wide">
        ${product.price}
      </p>

      {/* Add to Cart Button */}
      <button
        // onClick={() => onAddToCart(product)}
        className="flex items-center justify-center w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        <BsCartPlus className="mr-2 text-lg" />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
