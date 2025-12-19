import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { Product } from '@/types/product';
import {
  fetchProducts,
  fetchSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '@/api/product/productAPI';
import {
  toggleSavingProduct,
  getUserSavedProducts,
  ToggleSavingProductResponse
} from '@/api/user/userAPI'
import { setProducts } from '@/store/feature/product/productSlice';
import { setSavedProducts } from '@/store/feature/product/savedProductSlice';
import { toggle } from '@/store/feature/user/userSlice';


const useProduct = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  // ✅ Fetch all products
  const fetchProductsHandler = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchProducts(); // Expecting Product[]
      console.log("Fetched products:", data);
      dispatch(setProducts(data));
      return data;
    } catch (error: unknown) {
      const message =
          error instanceof Error ? error.message : "Failed to fetch products";
      setError(message);
    } finally {
      setLoading(false);
    }
  },[dispatch]);


  // ✅ Fetch single product by slug or id
  const fetchProductBySlugHandler = useCallback(async (slug: string) => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchSingleProduct(slug); // Expecting Product
      console.log("Fetched single product:", data);
      return data;
    } catch (error: unknown) {
      const message =
          error instanceof Error ? error.message : "Failed to fetch product";
      setError(message);
    } finally {
      setLoading(false);
    }
  },[]);



  // ✅ Create new product
  const createProductHandler = async (productData: Product) => {
    setError(null);
    setLoading(true);
    try {
      const data = await createProduct(productData); // Expecting Product
      console.log("Created product:", data);
      return data;
    } catch (error: unknown) {
      const message =
          error instanceof Error ? error.message : "Failed to create product";
      setError(message);
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
    } catch (error: unknown) {
      const message =
          error instanceof Error ? error.message : "Failed to update product";
      setError(message);
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
    } catch (error: unknown) {
      const message =
          error instanceof Error ? error.message : "Failed to delete product";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSavingProductHandler = async(productId: string): Promise< ToggleSavingProductResponse> => {
  try {
    setError(null);
    const res = await toggleSavingProduct(productId);
    dispatch(toggle(res.savedProducts));
    dispatch(setSavedProducts(res.populatedSavedProducts));
    return res;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to save or unsave product";
    setError(message);
    return Promise.reject(new Error(message));
  }
  };

  const getUserSavedProductsHandler = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await getUserSavedProducts();
      dispatch(setSavedProducts(data));
      return data;
    } catch (error: unknown) {
      const message =
      error instanceof Error ? error.message : "Failed to fetch user saved product";
      setError(message);
    } finally {
      setLoading(false);
    }
  },[dispatch]);


  return {
    error,
    loading,
    fetchProductsHandler,
    fetchProductBySlugHandler,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler,
    toggleSavingProductHandler,
    getUserSavedProductsHandler
  };
};

export default useProduct;
