'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArtisanResponse } from '@/types/artisan';
import useArtisan from '@/hooks/useArtisan';
import ProductCard from '@/components/products/ProductCard';

const ArtisanProfilePage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { fetchSingleArtisan, error, loading } = useArtisan();
  const [artisanDetails, setArtisanDetails] = useState<ArtisanResponse | null>(null);

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        const fetchedArtisan = await fetchSingleArtisan(slug);
        if (fetchedArtisan) setArtisanDetails(fetchedArtisan);
      } catch (err) {
        console.error('Error fetching artisan:', err);
        setArtisanDetails(null);
      }
    };
    fetchArtisan();
  }, [slug]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading artisan details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading artisan details: {error}</div>;
  }

  if (!artisanDetails) {
    return <div className="text-center text-red-500">Artisan not found</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Artisan Name */}
      <h1 className="text-4xl font-extrabold mb-6 text-yellow-800">{artisanDetails.artisan.fullName}</h1>

      {/* Artisan Image */}
      <img
        src={artisanDetails.artisan.profilePic}
        alt={`Profile of ${artisanDetails.artisan.fullName}`}
        className="w-32 h-32 object-cover rounded-full border-4 border-yellow-500 mb-6 shadow-md"
      />

      {/* Artisan Bio */}
      <p className="text-lg text-gray-800 mb-8 leading-relaxed">
        {artisanDetails.artisan.description}
      </p>

      {/* Section for Artisan Products */}
      <h3 className="text-3xl font-bold text-yellow-700 mb-4">
        Products by {artisanDetails.artisan.fullName}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {artisanDetails.products.map((product) => (
          <ProductCard key={product.slug} product={product}/>
        ))}
      </div>
    </div>
  );
};

export default ArtisanProfilePage;
