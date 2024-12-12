'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '@/components/products/ProductCard';
import FilterSidebar from '@/components/products/FilterSidebar';
import SortDropdown from '@/components/products/SortDropdown';
import { RootState } from '@/store/store';
import useProduct from '@/hooks/useProduct';
import { SkeletonCard } from '@/components/Skeleton/Skeleton';

const ProductListingPage = () => {

  const { fetchProductsHandler, error, loading } = useProduct();
  const products = useSelector((state: RootState) => state.product.products);

  // const products = [
  //   {
  //     _id: '1',
  //     title: 'Handmade Pottery Vase',
  //     images: ['https://res.cloudinary.com/dso7gnmps/image/upload/v1733309755/jewlery_fektgf.jpg', 'https://res.cloudinary.com/dso7gnmps/image/upload/v1733309755/jewlery_fektgf.jpg'],
  //     description: 'A beautiful handmade pottery vase.',
  //     materials: ['Clay', 'Glaze'],
  //     createdBy: 'artisan-slug-1',
  //     category: 'Pottery',
  //     price: 45.99,
  //     rating: 4.5,
  //     slug: 'handmade-pottery-vase',
  //     createdAt: '2023-01-01T00:00:00Z',
  //     updatedAt: '2023-01-01T00:00:00Z',
  //     __v: 0,
  //   },
  //   {
  //     _id: '2',
  //     title: 'Woven Basket',
  //     images: ['https://res.cloudinary.com/dso7gnmps/image/upload/v1733309773/painting_atkfcf.jpg', 'https://res.cloudinary.com/dso7gnmps/image/upload/v1733309755/jewlery_fektgf.jpg'],
  //     description: 'A sturdy and decorative woven basket.',
  //     materials: ['Straw', 'Dye'],
  //     createdBy: 'artisan-slug-2',
  //     category: 'Home Decor',
  //     price: 25.99,
  //     rating: 4.7,
  //     slug: 'woven-basket',
  //     createdAt: '2023-02-01T00:00:00Z',
  //     updatedAt: '2023-02-01T00:00:00Z',
  //     __v: 0,
  //   }, {
  //     _id: '3',
  //     title: 'Woven Basket',
  //     images: ['https://res.cloudinary.com/dso7gnmps/image/upload/v1733309755/jewlery_fektgf.jpg', 'https://res.cloudinary.com/dso7gnmps/image/upload/v1733309755/jewlery_fektgf.jpg'],
  //     description: 'A sturdy and decorative woven basket.',
  //     materials: ['Straw', 'Dye'],
  //     createdBy: 'artisan-slug-2',
  //     category: 'Home Decor',
  //     price: 25.99,
  //     rating: 4.7,
  //     slug: 'woven-basket',
  //     createdAt: '2023-02-01T00:00:00Z',
  //     updatedAt: '2023-02-01T00:00:00Z',
  //     __v: 0,
  //   }, {
  //     _id: '4',
  //     title: 'Woven Basket',
  //     images: ['https://res.cloudinary.com/dso7gnmps/image/upload/v1733309773/painting_atkfcf.jpg', 'https://res.cloudinary.com/dso7gnmps/image/upload/v1733309755/jewlery_fektgf.jpg'],
  //     description: 'A sturdy and decorative woven basket.',
  //     materials: ['Straw', 'Dye'],
  //     createdBy: 'artisan-slug-2',
  //     category: 'Home Decor',
  //     price: 25.99,
  //     rating: 4.7,
  //     slug: 'woven-basket',
  //     createdAt: '2023-02-01T00:00:00Z',
  //     updatedAt: '2023-02-01T00:00:00Z',
  //     __v: 0,
  //   },
  // ];


  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('price-asc');


  const categories = ['All', 'Clothing', 'Pottery', 'Jewelry', 'Home Decor'];

  useEffect(() => {
    if (products.length === 0) {
      fetchProductsHandler();
    }
  }, []); // Empty dependency array ensures it only runs on mount

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
            : sortedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
        </div>

      </div>
    </div>
  );
};

export default ProductListingPage;
