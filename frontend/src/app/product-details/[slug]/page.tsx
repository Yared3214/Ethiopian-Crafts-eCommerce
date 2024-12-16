'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ArtisanInfo from '@/components/ProductDetail/ArtisanInfo';
import ProductReviews from '@/components/ProductDetail/ProductReviews';
import { ProductWithDetails, Artisan, Review, Product } from '@/types/product';
import ProductCard from '@/components/products/ProductCard'
import useProduct from '@/hooks/useProduct';
import ReviwAndArtisanTabs from '@/components/ProductDetail/ReviewAndArtisanTabs';
import AddtoCart from '@/components/AddToCart/addToCart';

const ProductDetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { fetchProductBySlugHandler, error, loading } = useProduct();
  const [product, setProduct] = useState<ProductWithDetails | null>(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await fetchProductBySlugHandler(slug);
        if (fetchedProduct) setProduct(fetchedProduct);
      } catch (err) {
        console.error('Error fetching product:', err);
        setProduct(null);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-black">
        <div className="w-10 h-10 border-4 border-t-gray-800 border-gray-300 rounded-full animate-spin">
        </div>
      </div>
    );
  }


  if (error === 'Product not found') {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-semibold text-red-700">Product Not Found</h2>
        <p className="mt-4 text-gray-600">Sorry, the product you are looking for does not exist.</p>
        <Link
          href="/"
          className="mt-6 inline-block bg-yellow-700 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 space-y-10">
      {/* Product Title */}
      <h1 className="text-5xl font-serif font-extrabold text-red-900 mb-6">
        {product?.product?.title}
      </h1>

      {/* Product Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {product?.product?.images.map((image, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
          >
            <img
              src={image}
              alt={`${product?.product?.title} Image ${index + 1}`}
              className="w-full h-80 object-cover rounded-lg group-hover:opacity-80 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      {/* Product Rating */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="text-xl font-semibold text-gray-800">Rating:</div>
        <div className="flex items-center">
          {/* Render Stars */}
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              // fill={product?.product?.rating >= star ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`w-6 h-6 text-yellow-500`}
            // className={`w-6 h-6 ${product?.product?.rating >= star ? "text-yellow-500" : "text-gray-400"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 17.5l-6 3.5 1.5-7L2 7h7L12 0l3 7h7l-5.5 6.5L18 21z"
              />
            </svg>
          ))}
          <span className="ml-2 text-gray-600">{product?.product?.rating || 0} / 5</span>
        </div>
      </div>

      {/* Product Description and Purchase Options */}
      <div className="flex flex-col md:flex-row md:justify-between mb-8 space-y-6 md:space-y-0">
        <div className="md:w-2/3 space-y-4">
          <p className="text-sm prose prose-sm dark:prose-invert">{product?.product?.description}</p>
          <div className="text-md text-gray-600 pt-5 flex items-start">
            <div className="font-semibold text-lg mr-4">Materials:</div> {/* Styled "Materials" label */}
            <div className="flex flex-wrap gap-1 pt-1">
              {product?.product?.materials.map((material, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-white rounded-full text-sm px-3 py-[2px] shadow-md"
                >
                  {material}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-1/3 flex flex-col items-start md:items-end space-y-4">
          <p className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
            ${product?.product?.price}
          </p>
          {product && <AddtoCart product={product.product} />}
        </div>
      </div>

      {/* Artisan Info */}
      <ArtisanInfo artisan={product?.artisan as Artisan} />
      {/* <ReviwAndArtisanTabs /> */}
      {/* Product Reviews */}
      <ProductReviews reviews={product?.reviews as Review[]} />

      {/* Related Products */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Related Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {product?.relatedProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;
