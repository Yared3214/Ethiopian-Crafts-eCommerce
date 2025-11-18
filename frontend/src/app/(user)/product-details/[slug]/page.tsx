'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ArtisanInfo from '@/components/ProductDetail/ArtisanInfo';
import ProductReviews from '@/components/ProductDetail/ProductReviews';
import { ProductWithDetails, Artisan, Review } from '@/types/product';
import useProduct from '@/hooks/useProduct';
import AddtoCart from '@/components/AddToCart/addToCart';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ProductDetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { fetchProductBySlugHandler, error, loading } = useProduct();
  const [product, setProduct] = useState<ProductWithDetails | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await fetchProductBySlugHandler(slug);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setSelectedImage(fetchedProduct.product.images[0]);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setProduct(null);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-gray-950">
        <div className="w-12 h-12 border-4 border-t-transparent border-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product || error === 'Product not found') {
    return (
      <div className="container mx-auto py-24 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src="/assets/empty-box.svg"
            alt="Product Not Found"
            width={180}
            height={180}
            className="mx-auto opacity-80"
          />
          <h2 className="text-3xl font-bold text-red-700 mt-6">Product Not Found</h2>
          <p className="text-gray-600 mt-2">
            Sorry, the product you’re looking for doesn’t exist or has been removed.
          </p>
          <Link href="/" passHref>
            <Button className="mt-6 rounded-xl px-6 bg-blue-600 hover:bg-blue-700">
              Go Back Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const { product: prod, artisan, reviews } = product;

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 space-y-12">
      {/* Title */}
      <motion.h1
        className="text-4xl sm:text-5xl font-serif font-extrabold text-gray-900 dark:text-white mb-10 tracking-tight"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {prod.title}
      </motion.h1>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Gallery */}
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="relative w-full h-[480px] rounded-2xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-900">
            <Image
              src={selectedImage ?? prod.images[0]}
              alt={prod.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 justify-center flex-wrap mt-2">
            {prod.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  selectedImage === img
                    ? 'border-blue-600 ring-2 ring-blue-300'
                    : 'border-gray-200 hover:border-gray-400 dark:border-gray-700'
                }`}
              >
                <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div
          className="flex flex-col justify-between space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Rating */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={prod.rating >= star ? '#facc15' : 'none'}
                stroke="#facc15"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 17.5l-6 3.5 1.5-7L2 7h7L12 0l3 7h7l-5.5 6.5L18 21z"
                />
              </svg>
            ))}
            <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">
              {prod.rating?.toFixed(1) || '0.0'} / 5
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-[15px]">
            {prod.description}
          </p>

          {/* Materials */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Materials
            </h3>
            <div className="flex flex-wrap gap-2">
              {prod.materials.map((mat, i) => (
                <span
                  key={i}
                  className="bg-blue-100 dark:bg-blue-800/40 text-blue-700 dark:text-blue-300 text-sm px-3 py-[4px] rounded-full shadow-sm"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>

          {/* Price + Add to Cart */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-4xl font-bold text-blue-700 dark:text-blue-400 tracking-tight">
              ${prod.price}
            </p>
            <AddtoCart product={prod} />
          </div>
        </motion.div>
      </div>

      {/* Artisan Info */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <ArtisanInfo artisan={artisan as Artisan} />
      </motion.section>

      {/* Product Reviews */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <ProductReviews reviews={reviews as Review[]} />
      </motion.section>
    </div>
  );
};

export default ProductDetailPage;
