'use client';

import Link from 'next/link';

const artisanData = [
  {
    slug: "lidya-assefa",
    name: "Lidya Assefa",
    bio: "Lidya is an artisan from Addis Ababa, known for her expertise in weaving beautiful traditional scarves.",
    image: "https://img.freepik.com/premium-photo/skill-artistry-african-craftsmen-wom_670382-31470.jpg",
    products: [
      {
        slug: "ethiopian-handwoven-scarf",
        name: "Ethiopian Handwoven Scarf",
        price: 25,
        description: "A beautiful traditional Ethiopian scarf made from high-quality fabric, ideal for any occasion.",
        image: "https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg"
      },
      {
        slug: "handwoven-basket",
        name: "Handwoven Basket",
        price: 30,
        description: "A traditional basket from Ethiopia, handwoven with care.",
        image: "/images/product1.jpg"
      }
    ]
  },
  // More artisan data...
];

const ArtisanProfilePage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  // Fetch artisan data based on slug
  const artisan = artisanData.find(artisan => artisan.slug === slug);

  if (!artisan) {
    return <div className="text-center text-red-500">Artisan not found</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Artisan Name */}
      <h1 className="text-4xl font-extrabold mb-6 text-yellow-800">{artisan.name}</h1>

      {/* Artisan Image */}
      <img
        src={artisan.image}
        alt={artisan.name}
        className="w-32 h-32 object-cover rounded-full border-4 border-yellow-500 mb-6 shadow-md"
      />

      {/* Artisan Bio */}
      <p className="text-lg text-gray-800 mb-8 leading-relaxed">
        {artisan.bio}
      </p>

      {/* Section for Artisan Products */}
      <h3 className="text-3xl font-bold text-yellow-700 mb-4">
        Products by {artisan.name}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artisan.products.map((product) => (
          <Link key={product.slug} href={`/product-details/${product.slug}`}>
            <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer bg-white">
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4 transition-transform transform hover:scale-105"
              />

              {/* Product Name */}
              <h3 className="text-lg font-bold text-yellow-900">{product.name}</h3>

              {/* Product Price */}
              <p className="text-xl font-semibold text-green-700">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtisanProfilePage;
