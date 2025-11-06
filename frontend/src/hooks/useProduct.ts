import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Product } from '@/types/product';
import {
  fetchProducts,
  fetchSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '@/api/product/productAPI';
import { setProducts } from '@/store/feature/product/productSlice';


const useProduct = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  // ✅ Fetch all products
  const fetchProductsHandler = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchProducts(); // Expecting Product[]
      console.log("Fetched products:", data);
      dispatch(setProducts(data));
      return data;
    } catch (error) {
      setError((error as any).message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };


  // ✅ Fetch single product by slug or id
  const fetchProductBySlugHandler = async (slug: string) => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchSingleProduct(slug); // Expecting Product
      console.log("Fetched single product:", data);
      return data;
    } catch (error) {
      setError((error as any).message || 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };



  // ✅ Create new product
  const createProductHandler = async (productData: Product) => {
    setError(null);
    setLoading(true);
    try {
      const data = await createProduct(productData); // Expecting Product
      console.log("Created product:", data);
      return data;
    } catch (error) {
      console.error("Error creatinggg product:", (error as any).message);
      setError((error as any).message || 'Failed to create product');
    } finally {
      setError(null);
      setLoading(true);
      setLoading(false);
    }
  };

  // ✅ Update existing product
  const updateProductHandler = async (id: string, productData: Partial<Product>) => {
    try {
      const updatedProduct = await updateProduct(id, productData); // Expecting Product
      console.log("Updated product:", updatedProduct);
      return updatedProduct;
    } catch (error) {
      setError((error as any).message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete product
  const deleteProductHandler = async (id: string) => {
    setError(null);
    setLoading(true);
    try {
      const deletedProduct = await deleteProduct(id); // Expecting Product
      console.log("Deleted product:", deletedProduct);
      return deletedProduct;
    } catch (error) {
      setError((error as any).message || 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };


  return {
    error,
    loading,
    fetchProductsHandler,
    fetchProductBySlugHandler,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler,
  };
};

export default useProduct;
