'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ArtisanInfo from '@/components/ProductDetail/ArtisanInfo';
import ProductReviews from '@/components/ProductDetail/ProductReviews';
import { ProductWithDetails, Artisan, Review, Product } from '@/types/product';
import ProductCard from '@/components/products/ProductCard'
import useProduct from '@/hooks/useProduct';


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
      <div className="container mx-auto py-20 text-center">
        <p className="text-2xl font-semibold text-gray-500">Loading product...</p>
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
      <h1 className="text-5xl font-serif font-extrabold text-red-900 mb-6">{product?.product?.title}</h1>

      {/* Product Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {product?.product?.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${product?.product?.title} Image ${index + 1}`}
            className="w-full h-80 object-cover rounded-lg border-4 border-yellow-500 shadow-lg hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>

      {/* Product Description and Purchase Options */}
      <div className="flex flex-col md:flex-row md:justify-between mb-8 space-y-6 md:space-y-0">
        <div className="md:w-2/3 space-y-4">
          <p className="text-xl text-gray-800">{product?.product?.description}</p>
          <p className="text-md text-gray-600">
            <strong>Materials:</strong> {product?.product?.materials.join(', ')}
          </p>
        </div>
        <div className="md:w-1/3 flex flex-col items-start md:items-end space-y-4">
          <p className="text-4xl font-bold text-green-700">${product?.product?.price}</p>
          <button className="bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 shadow-md">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Artisan Info */}
      <ArtisanInfo artisan={product?.artisan as Artisan} />

      {/* Product Reviews */}
      <ProductReviews reviews={product?.reviews as Review[]} />

      {/* Related Products */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Related Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {product?.relatedProducts.map((product) => (
          <ProductCard key={product.slug} product={product} loading={loading} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;
