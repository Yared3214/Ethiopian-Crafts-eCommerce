// src/app/blog/[slug]/page.tsx

import Link from 'next/link';

const blogPosts = [
  {
    slug: 'the-art-of-weaving-in-ethiopia',
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
    return <div className="flex justify-center items-center h-screen">Post not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-yellow-600 mb-4">{post.title}</h1>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto rounded-lg mb-4"
        />
      )}
      <p className="text-gray-600 mb-6">{post.content}</p>
      <div className="mt-8">
        <Link href="/blog" className="text-yellow-500 hover:underline">
          Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogDetailPage;
