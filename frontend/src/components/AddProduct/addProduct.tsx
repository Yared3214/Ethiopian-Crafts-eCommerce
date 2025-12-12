"use client";

import ProductForm from "../ProductForm/productForm";
import useProduct from "../../hooks/useProduct"; // make sure this hook exists
import { showToast } from "nextjs-toast-notify";
import { Product } from "@/types/product";

export default function AddProduct() {
  const { createProductHandler, loading, error } = useProduct();

  const handleAddProduct = async (data: Product) => {
    try {
      console.log("the error is here", error);
      const result = await createProductHandler(data);

      if (result) {
        showToast.success("Product Created Successfully", {
          duration: 4000,
          progress: false,
          position: "bottom-right",
          transition: "slideInUp",
          icon: "",
          sound: false,
        });
      }
    } catch (err) {
      let message = "Failed to add product";

      if (err instanceof Error) {
        message = err.message;
      }

      showToast.error(message, {
        duration: 4000,
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="w-full">
      <ProductForm onSubmit={handleAddProduct} loading={loading} error={error} />
    </div>
  );
}
