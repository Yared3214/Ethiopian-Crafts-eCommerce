import { ProductResponse } from "@/types/product";
import { SkeletonCard } from '@/components/Skeleton/Skeleton';
import { motion } from 'framer-motion';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';


interface ProductListProps {
  products: ProductResponse[];
  toggleSaveProduct: (productId: string) => Promise<any>;
  onClear?: (category: string) => void;
  loading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, toggleSaveProduct, onClear, loading }) => {

  return (
    <div>
        {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <SkeletonCard key={index} />
                    ))}
                  </div>
                ) : products.length > 0 ? (
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {products.map((product) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductCard product={product} toggleSaveProduct={toggleSaveProduct} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    className="flex flex-col items-center justify-center mt-16 text-center space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="text-xl font-semibold text-gray-800">
                      No products found
                    </h2>
                    <p className="text-gray-500 max-w-sm">
                      We couldn’t find any products matching your selected category. Try adjusting your filters.
                    </p>
                    {onClear &&
                    <Button
                    onClick={() => onClear('All')}
                    variant="outline"
                    className="mt-3"
                  >
                    Clear Filters
                  </Button>
                  }
                  </motion.div>
                )}
    </div>
  );
};

export default ProductList;
