// src/app/blog/page.tsx

import Link from 'next/link';

const blogPosts = [
  {
    slug: 'the-art-of-weaving-in-ethiopia',
    title: 'The Art of Weaving in Ethiopia',
    image: 'https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg', // Replace with a relevant cultural image
    description: 'Dive into the traditional art of weaving, exploring its history and cultural significance in Ethiopia.',
    category: 'Traditions',
  },
  {
    slug: 'timkat-celebrating-epiphany-in-ethiopia',
    title: 'Timkat: Celebrating Epiphany in Ethiopia',
    image: 'https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg', // Replace with a relevant cultural image
    description: 'Experience the vibrant festivities of Timkat, one of Ethiopia’s most cherished religious celebrations.',
    category: 'Festivals',
  },
  {
    slug: 'meet-the-artisans-pottery-masters',
    title: 'Meet the Artisans: Pottery Masters',
    image: 'https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg', // Replace with a relevant cultural image
    description: 'Learn about the skilled artisans behind Ethiopian pottery and the stories behind their crafts.',
    category: 'Artisans',
  },
  {
    slug: 'handwoven-basket-tutorial',
    title: 'How to Create a Handwoven Basket',
    image: 'https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg', // Replace with a relevant cultural image
    description: 'A step-by-step guide to weaving a traditional Ethiopian basket.',
    category: 'Tutorials',
  },
];

const BlogPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-yellow-600 mb-6">Ethiopian Crafts Blog</h1>
      <p className="text-center text-gray-600 mb-8">
        Explore the rich traditions and stories behind Ethiopian crafts and artisans. 
        Our blog features articles on cultural practices, festivals, artisan highlights, and tutorials on various crafts.
      </p>

      {/* Categories Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-yellow-600 mb-4">Explore by Category</h2>
        <ul className="flex space-x-4">
          <li className="bg-yellow-100 rounded-full px-4 py-2 text-yellow-800">Traditions</li>
          <li className="bg-yellow-100 rounded-full px-4 py-2 text-yellow-800">Festivals</li>
          <li className="bg-yellow-100 rounded-full px-4 py-2 text-yellow-800">Artisans</li>
          <li className="bg-yellow-100 rounded-full px-4 py-2 text-yellow-800">Tutorials</li>
        </ul>
      </div>

      {/* Blog Posts List */}
      <ul className="space-y-4">
        {blogPosts.map((post) => (
          <li key={post.slug} className="border rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105">
            <Link href={`/blog/${post.slug}`}>
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50">
                  <h2 className="text-2xl font-semibold text-white">{post.title}</h2>
                  <p className="text-gray-300 mt-2">{post.description}</p>
                </div>
              </div>
              <div className="p-6 bg-yellow-100 hover:bg-yellow-200 transition duration-300">
                <p className="text-gray-500 mt-2 text-center">Read more about this post...</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
