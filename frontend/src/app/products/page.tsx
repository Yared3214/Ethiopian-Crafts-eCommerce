'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '@/components/products/ProductCard';
import FilterSidebar from '@/components/products/FilterSidebar';
import SortDropdown from '@/components/products/SortDropdown';
import { RootState } from '@/store/store';
import useProduct from '@/hooks/useProduct';
import { SkeletonCard } from '@/components/Skeleton/Skeleton';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const ProductListingPage = () => {
  const { fetchProductsHandler, error, loading } = useProduct();
  const products = useSelector((state: RootState) => state.product.products);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('price-asc');

  const categories = ['All', 'Clothing', 'Pottery', 'Jewelry', 'Home Decor'];

  useEffect(() => {
    if (products.length === 0) {
      fetchProductsHandler();
    }
  }, []);

  const filteredProducts = products.filter(
    (product) => selectedCategory === 'All' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block w-1/5">
        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Product Listings</h1>

        {/* Sort Dropdown */}
        <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />

        {/* Categories Dropdown for small screens */}
        <div className="md:hidden mt-4">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : sortedProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {sortedProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center mt-16 text-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-gray-800">
              No products found
            </h2>
            <p className="text-gray-500 max-w-sm">
              We couldn’t find any products matching your selected category. Try adjusting your filters.
            </p>
            <Button
              onClick={() => setSelectedCategory('All')}
              variant="outline"
              className="mt-3"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};


export default ProductListingPage;