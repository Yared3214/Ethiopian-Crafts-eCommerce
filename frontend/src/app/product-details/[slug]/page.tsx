'use client';

import Link from 'next/link';
import ArtisanInfo from '@/components/ProductDetail/ArtisanInfo';
import ProductReviews from '@/components/ProductDetail/ProductReviews';
import RelatedProducts from '@/components/ProductDetail/RelatedProducts';

const productData = {
  'ethiopian-handwoven-scarf': {
    slug: 'ethiopian-handwoven-scarf',
    name: 'Ethiopian Handwoven Scarf',
    price: 25,
    images: [
      "https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg",
      "https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg",
    ],
    description:
      'A beautiful traditional Ethiopian scarf made from high-quality fabric, ideal for any occasion.',
    materials: 'Cotton, Silk',
    artisan: {
      name: 'Lidya Assefa',
      slug: 'lidya-assefa',
      bio: 'Lidya is an artisan from Addis Ababa, known for her expertise in weaving beautiful traditional scarves.',
      image: 'https://img.freepik.com/premium-photo/skill-artistry-african-craftsmen-wom_670382-31470.jpg',
    },
    reviews: [
      { user: 'John Doe', rating: 4, comment: 'Beautiful scarf, very comfortable to wear!' },
      { user: 'Jane Smith', rating: 5, comment: 'I love the design and quality!' },
    ],
    relatedProducts: [
      { slug: 'handwoven-basket', name: 'Handwoven Basket', image: 'https://img.freepik.com/premium-photo/skill-artistry-african-crafts-men_670382-90383.jpg', price: 30 },
      { slug: 'traditional-coffee-pot', name: 'Traditional Coffee Pot (Jebena)', image: 'https://img.freepik.com/premium-photo/skill-artistry-african-crafts-men_670382-90383.jpg', price: 50 },
    ],
  },
  // Add other products here with their respective slugs
};

const ProductDetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  // Fetch product data based on slug (mock data for example)
  const product = productData[slug];

  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-semibold text-red-700">Product Not Found</h2>
        <p className="mt-4 text-gray-600">Sorry, the product you are looking for does not exist.</p>
        <Link href="/" className="mt-6 inline-block bg-yellow-700 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Product Title */}
      <h1 className="text-5xl font-serif font-extrabold mb-6 text-red-900">{product.name}</h1>

      {/* Product Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${product.name} Image ${index + 1}`}
            className="w-full h-80 object-cover rounded-lg border-4 border-yellow-500 shadow-lg hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>

      {/* Product Description */}
      <div className="flex flex-col md:flex-row md:justify-between mb-8">
        <div className="md:w-2/3">
          <p className="text-xl text-gray-800 mb-4">{product.description}</p>
          <p className="text-md text-gray-600 mb-4">
            <strong>Materials:</strong> {product.materials}
          </p>
        </div>

        {/* Price & Purchase Options */}
        <div className="md:w-1/3 flex flex-col items-start md:items-end">
          <p className="text-4xl font-bold text-green-700 mb-4">${product.price}</p>
          <button className="bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 shadow-md">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Artisan Info */}
      <ArtisanInfo artisan={product.artisan} />

      {/* Product Reviews */}
      <ProductReviews reviews={product.reviews} />

      {/* Related Products */}
      <h3 className="text-3xl font-semibold mb-6 text-red-900">Related Products</h3>
      <RelatedProducts relatedProducts={product.relatedProducts} />
    </div>
  );
};

export default ProductDetailPage;
