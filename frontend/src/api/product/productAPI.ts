import axios from "axios";
import { ProductResponse , Product, ProductWithDetails} from "../../types/product";
import store from "../../store/store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Fetch all products
export const fetchProducts = async (): Promise<ProductResponse[]> => {
  try {
    const response = await axios.get(`${API_URL}/product`);
    return response.data.products as ProductResponse[];
  } catch (error: any) {
    console.error("Error while getting all products", error);
    throw error.response ? error.response.data : new Error("Network error");
  }
};

// ✅ Fetch single product by id
export const fetchSingleProduct = async (slug: string): Promise<ProductWithDetails> => {
  console.log("the slug", slug)
  try {
    const response = await axios.get(`${API_URL}/product/single/${slug}`);
    return response.data.data as ProductWithDetails;
  } catch (error: any) {
    console.error("Error while getting single product", error);
    throw error.response ? error.response.data : new Error("Network error");
  }
};

// ✅ Create new product (multiple images)
export const createProduct = async (productData: Product): Promise<Product> => {
  try {
    const token = store.getState().user.user?.tokens.access.token;
    if (!token) throw new Error("User is not authenticated");

    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("materials", productData.materials.join(","));
    formData.append("createdBy", productData.createdBy);
    formData.append("category", productData.category);
    formData.append("price", productData.price.toString());

    // Append multiple images
    productData.images.forEach((img) => formData.append("productImage", img));

    const artisanSlug = productData.createdBy.toLowerCase().split(" ").join("-");
    console.log("the artisan slug", artisanSlug)
    console.log("the form data", formData)
    const response = await axios.post(`${API_URL}/product/create/${artisanSlug}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.product as Product;
  } catch (error: any) {
    console.error("Error creating product:", error);
    throw error.response ? error.response.data : new Error("Network error");
  }
};

// ✅ Update existing product (multiple images)
export const updateProduct = async (
  id: string,
  productData: Partial<Product>
): Promise<Product> => {
  try {
    const token = store.getState().user.user?.tokens.access.token;
    if (!token) throw new Error("User is not authenticated");

    const formData = new FormData();
    if (productData.title) formData.append("title", productData.title);
    if (productData.description) formData.append("description", productData.description);
    if (productData.materials) formData.append("materials", productData.materials.join(","));
    if (productData.createdBy) formData.append("createdBy", productData.createdBy);
    if (productData.category) formData.append("category", productData.category);
    if (productData.price !== undefined) formData.append("price", productData.price.toString());

    // Append multiple images if provided
    if (productData.images) {
      productData.images.forEach((img) => {
        if (img instanceof File) formData.append("productImage", img);
      });
    }

    const response = await axios.put(`${API_URL}/product/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.product as Product;
  } catch (error: any) {
    console.error("Error updating product:", error);
    throw error.response ? error.response.data : new Error("Network error");
  }
};

// ✅ Delete product by id
export const deleteProduct = async (id: string): Promise<any> => {
  try {
    const token = store.getState().user.user?.tokens.access.token;
    if (!token) throw new Error("User is not authenticated");

    const response = await axios.delete(`${API_URL}/product/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error deleting product:", error);
    throw error.response ? error.response.data : new Error("Network error");
  }
};
