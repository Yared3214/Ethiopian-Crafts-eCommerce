"use client";

import ProductForm from "../ProductForm/productForm";
import useProduct from "../../hooks/useProduct"; // make sure this hook exists
import { showToast } from "nextjs-toast-notify";

export default function AddProduct() {
  const { createProductHandler, loading, error } = useProduct();

  const handleAddProduct = async (data: any) => {
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
    } catch (err: any) {
      showToast.error(err.message || "Failed to add product", {
        duration: 4000,
        position: "bottom-right",
      }); console.error("❌ Error adding product:", err);
    }
  };

  return (
    <div className="w-full">
      <ProductForm onSubmit={handleAddProduct} loading={loading} error={error} />
    </div>
  );
}
