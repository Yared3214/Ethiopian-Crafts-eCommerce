import Link from 'next/link';

interface RelatedProductsProps {
  relatedProducts: { slug: string; name: string; image: string; price: number }[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ relatedProducts }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {relatedProducts.map((product) => (
      <Link key={product.slug} href={`/product-details/${product.slug}`}>
        <div className="border border-yellow-500 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl hover:scale-105 transform transition-transform duration-300">
          {/* Product Image with hover zoom effect */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-110"
          />
          {/* Product Name */}
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
            {product.name}
          </h3>
          {/* Product Price */}
          <p className="text-red-700 text-lg font-semibold">${product.price}</p>
        </div>
      </Link>
    ))}
  </div>
);

export default RelatedProducts;
