import { useEffect, useState } from "react";
import { SkeletonCard } from "../Skeleton/Skeleton";
import ProductCard from "../products/ProductCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useProduct from "@/hooks/useProduct";

export const sampleProducts = [
  {
    _id: "1",
    title: "Handwoven Cotton Shawl",
    description:
      "A beautifully crafted Ethiopian handwoven shawl made from 100% organic cotton, featuring traditional Dorze patterns.",
    images: ["https://images.unsplash.com/photo-1582555172860-07debf8d86e3?auto=format&fit=crop&w=800&q=80"],
    price: 45,
    slug: "handwoven-cotton-shawl",
    category: "Clothing",
    materials: ["Cotton"],
    createdBy: "Artisan A",
    rating: 4.5,
    reviews: 10,
    createdAt: "July 14, 2023",
    updatedAt: "July 14, 2023",
    __v: 0,
  },
  {
    _id: "2",
    title: "Ceramic Coffee Set",
    description:
      "Traditional Ethiopian clay coffee set handmade in the highlands, perfect for the classic Buna ceremony.",
    images: ["https://images.unsplash.com/photo-1584428885051-d80a38d86b39?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074"],
    price: 65,
    slug: "ethiopian-ceramic-coffee-set",
    category: "Pottery",
    materials: ["Clay"],
    createdBy: "Artisan B",
    rating: 4.8,
    reviews: 15,
    createdAt: "July 14, 2023",
    updatedAt: "July 14, 2023",
    __v: 1,
  },
  {
    _id: "3",
    title: "Lalibela Cross Pendant",
    description:
      "Intricately designed silver cross pendant inspired by the ancient Lalibela churches — a timeless symbol of Ethiopian faith.",
    images: ["https://leasabessinia.com/cdn/shop/files/Silberanhaenger5b1.jpg?v=1714512277"],
    price: 80,
    slug: "lalibela-cross-pendant",
    category: "Jewelry",
    materials: ["Silver"],
    createdBy: "Artisan C",
    rating: 4.7,
    reviews: 8,
    createdAt: "July 14, 2023",
    updatedAt: "July 14, 2023",
    __v: 2,
  },
  {
    _id: "4",
    title: "Handwoven Basket (Mesob)",
    description:
      "A vibrant traditional Ethiopian basket used for serving injera — handmade from natural fibers with geometric patterns.",
    images: ["https://www.habeshamarketplace.com/wp-content/uploads/2023/11/Mesob-Small-1-17-scaled.jpg"],
    price: 55,
    slug: "handwoven-basket-mesob",
    category: "Home Decor",
    materials: ["Natural Fibers"],
    createdBy: "Artisan D",
    rating: 4.6,
    reviews: 12,
    createdAt: "July 14, 2023",
    updatedAt: "July 14, 2023",
    __v: 3,
  },
  {
    _id: "5",
    title: "Leather Shoulder Bag",
    description:
      "Elegant Harar-crafted leather shoulder bag, blending timeless Ethiopian craftsmanship with modern design.",
    images: ["https://i5.walmartimages.com/seo/Men-s-Shoulder-Bags-Male-Genuine-Leather-Bag-Men-s-Messenger-Bags-Business-Handbag-for-Men-Satchel-Crossbody-Bags_59cdf491-defb-4436-9c9b-99a9ce5eaf6e.b5081d08d73d74c309dec15e3a0428f4.jpeg"],
    price: 120,
    slug: "ethiopian-leather-bag",
    category: "Clothing",
    materials: ["Leather"],
    createdBy: "Artisan E",
    rating: 4.9,
    reviews: 20,
    createdAt: "July 14, 2023",
    updatedAt: "July 14, 2023",
    __v: 4,
  },
  {
    _id: "6",
    title: "Clay Incense Burner",
    description:
      "Hand-sculpted pottery incense burner used in Ethiopian homes for aromatic and spiritual purposes.",
    images: ["https://garudalife.in/cache/large/product/86447/MDKBSPZUFO8W.webphttps://i.etsystatic.com/40573663/r/il/922024/5058961068/il_570xN.5058961068_o69i.jpg"],
    price: 25,
    slug: "ethiopian-clay-incense-burner",
    category: "Pottery",
    materials: ["Clay"],
    createdBy: "Artisan F",
    rating: 4.3,
    reviews: 5,
    createdAt: "July 14, 2023",
    updatedAt: "July 14, 2023",
    __v: 5,
  },
  {
    _id: "7",
    title: "Beaded Bracelet Set",
    description:
      "A set of colorful hand-beaded bracelets inspired by traditional Ethiopian jewelry from the Oromo region.",
    images: ["https://i.etsystatic.com/18888049/r/il/8bb126/3911595705/il_570xN.3911595705_u6md.jpg"],
    price: 20,
    slug: "ethiopian-beaded-bracelet-set",
    category: "Jewelry",
    materials: ["Beads"],
    createdBy: "Artisan G",
    rating: 4.4,
    reviews: 7,
    createdAt: "July 14, 2023",
    updatedAt: "July 14, 2023",
    __v: 6,
  },
  {
    _id: "8",
    title: "Hand-carved Wooden Mask",
    description:
      "Artistic wooden mask inspired by Ethiopian folklore, crafted by artisans using sustainable wood.",
    images: ["https://i.ebayimg.com/images/g/bK8AAOSw54NeVXRQ/s-l1200.jpg"],
    price: 70,
    slug: "ethiopian-wooden-mask",
    category: "Home Decor",
    materials: ["Wood"],
    createdBy: "Artisan H",
    rating: 4.5,
    reviews: 9,
    createdAt: "July 14, 2023",
    updatedAt: "July 14, 2023",
    __v: 7,
  },
  {
    _id: "9",
    title: "Traditional Cotton Tunic",
    description:
      "Lightweight tunic handwoven with organic cotton and finished with colorful tibeb borders, perfect for casual wear.",
    images: ["https://img.gem.app/344719088/1t/1756501923/traditional-ethiopian-women-dress.jpg"],
    price: 60,
    slug: "ethiopian-cotton-tunic",
    category: "Clothing",
    materials: ["Cotton"],
    createdBy: "Artisan I",
    rating: 4.6,
    reviews: 11,
    createdAt: "July 14, 2023",
    updatedAt: "July 14, 2023",
    __v: 8,
  },
  {
    _id: "10",
    title: "Terracotta Vase",
    description:
      "Rustic terracotta vase with a matte finish, handcrafted using centuries-old pottery techniques.",
    images: ["https://www.country-interiors.com/cdn/shop/files/n23-4502.jpg?v=1739802116&width=2400"],
    price: 40,
    slug: "ethiopian-terracotta-vase",
    category: "Home Decor",
    materials: ["Terracotta"],
    createdBy: "Artisan J",
    rating: 4.2,
    reviews: 6,
    createdAt: "July 14, 2023",
    updatedAt: "July 14, 2023",
    __v: 9,
  },
];

export default function ProductManager() {
  const { fetchProductsHandler, error, loading } = useProduct();
  const products = useSelector((state: RootState) => state.product.products);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Clothing', 'Pottery', 'Jewelry', 'Home Decor'];

  useEffect(() => {
      if (products.length === 0) {
        fetchProductsHandler();
      }
    }, []); // Empty dependency array ensures it only runs on mount

  const filteredProducts = sampleProducts.filter(
      (product) => selectedCategory === 'All' || product.category === selectedCategory
    );

  return (
    <div className="flex-1 overflow-y-auto p-6">
  <div className="mb-6 flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Manage Products</h1>
      <p className="text-sm text-gray-500">
        Update or delete products from your store
      </p>
    </div>
  </div>

  {/* Category Filter */}
  <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        className={`px-4 py-2 rounded-xl border text-sm whitespace-nowrap transition
          ${
            selectedCategory === cat
              ? "bg-blue-600 text-white border-blue-600"
              : "hover:bg-gray-100 text-gray-700 border-gray-200"
          }`}
      >
        {cat}
      </button>
    ))}
  </div>

  {/* Product Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {loading
      ? Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))
      : filteredProducts.map((product) => (
          <ProductCard role={"admin"} key={product.slug} product={product} />
        ))}
  </div>
</div>

  );
}
