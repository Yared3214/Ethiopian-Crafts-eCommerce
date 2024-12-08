// src/app/blog/[slug]/page.tsx

import Link from 'next/link';

const blogPosts = [
  {
    slug: 'dawn-of-innovation',
    title: 'The Art of Weaving in Ethiopia',
    content: 'This blog post discusses the traditional art of weaving in Ethiopia, its history, and cultural significance. Weaving is not just a craft; it’s a story woven through generations.',
    image: 'https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg', // Replace with a real image URL
  },
  {
    slug: 'timkat-celebrating-epiphany-in-ethiopia',
    title: 'Timkat: Celebrating Epiphany in Ethiopia',
    content: 'An overview of the Timkat festival, its traditions, and how it is celebrated in various regions of Ethiopia. This vibrant festival showcases the rich cultural tapestry of Ethiopian heritage.',
    image: 'https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg', // Replace with a real image URL
  },
  {
    slug: 'meet-the-artisans-pottery-masters',
    title: 'Meet the Artisans: Pottery Masters',
    content: 'A feature on the artisans behind Ethiopian pottery, their techniques, and the importance of pottery in Ethiopian culture. Each piece tells a story of its maker and their community.',
    image: 'https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg', // Replace with a real image URL
  },
];

const BlogDetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  // Find the blog post by slug
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <div className="flex justify-center items-center h-screen text-2xl font-semibold text-gray-600">Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-5xl font-extrabold text-yellow-600 mb-6 text-center border-b-2 pb-4 border-yellow-400">
        {post.title}
      </h1>
      {post.image && (
        <div className="overflow-hidden rounded-lg mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full max-h-[500px] object-cover mx-auto transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        {post.content}
      </p>

      <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-yellow-700 mb-4">Did you know?</h2>
        <p className="text-gray-700">
          Ethiopian crafts are deeply rooted in the country’s history and often serve as a way to pass down cultural stories and values. Each piece reflects the identity of its maker and their heritage.
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts
            .filter((relatedPost) => relatedPost.slug !== slug)
            .map((relatedPost) => (
              <div key={relatedPost.slug} className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                <h4 className="text-xl font-bold text-yellow-600 mb-2">
                  {relatedPost.title}
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  {relatedPost.content.substring(0, 100)}...
                </p>
                <Link
                  href={`/blog/${relatedPost.slug}`}
                  className="text-yellow-500 hover:text-yellow-700 font-semibold"
                >
                  Read More &rarr;
                </Link>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg shadow hover:bg-yellow-600 transition-colors duration-300"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogDetailPage;