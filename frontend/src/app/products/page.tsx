// app/products/page.tsx
'use client';

import { useState } from 'react';
import ProductCard from '@/components/products/ProductCard';
import FilterSidebar from '@/components/products/FilterSidebar';
import SortDropdown from '@/components/products/SortDropdown';

interface Product {
  slug: string; // Changed from id to slug
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}



const ProductListingPage = () => {
  const products: Product[] = [
    { slug: 'ethiopian-handwoven-scarf', name: 'Ethiopian Handwoven Scarf', price: 25, image: "https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg", description: 'A beautiful traditional Ethiopian scarf.', category: 'Clothing' },
    { slug: 'traditional-coffee-pot', name: 'Traditional Coffee Pot (Jebena)', price: 50, image: "https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg", description: 'A handmade clay coffee pot.', category: 'Pottery' },
    { slug: 'handmade-jewelry', name: 'Handmade Jewelry', price: 80, image: "https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg", description: 'Exquisite Ethiopian jewelry.', category: 'Jewelry' },
    { slug: 'handwoven-basket', name: 'Handwoven Basket', price: 30, image: "https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg", description: 'A traditional basket from Ethiopia.', category: 'Home Decor' },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('price-asc');

  const categories = ['All', 'Clothing', 'Pottery', 'Jewelry', 'Home Decor'];

  const filteredProducts = products.filter((product) =>
    selectedCategory === 'All' || product.category === selectedCategory
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.slug} product={product} /> 
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
