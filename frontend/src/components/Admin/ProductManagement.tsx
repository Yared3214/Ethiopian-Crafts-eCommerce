"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";
import DeleteConfirmation from "./DeleteConfirmation";
import useProduct from "@/hooks/useProduct";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type Product = {
  id: string;
  title: string;
  description: string;
  materials: string;
  category: string;
  price: number;
};

const AdminProducts: React.FC = () => {
  const { fetchProductsHandler, loading, error } = useProduct();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  // Access products from the Redux store
  const products = useSelector((state: RootState) => state.product.products);

  // Fetch products on component mount
  useEffect(() => {
    fetchProductsHandler();
  }, []);

  // Handle Save (Create or Update)
  const handleSave = async (data: Product) => {
    try {
      if (editingProduct) {
        // Update product
        await axios.put(`/api/products/${editingProduct.id}`, data);
      } else {
        // Create product
        await axios.post("/api/products", data);
      }
      fetchProductsHandler(); // Refresh products after save
      setModalOpen(false); // Close modal
      setEditingProduct(null); // Reset editing state
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!deleteProductId) return;
    try {
      await axios.delete(`/api/products/${deleteProductId}`);
      fetchProductsHandler(); // Refresh products after deletion
      setDeleteProductId(null); // Reset delete product state
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="max-w-full mx-auto p-4 sm:p-8 bg-gray-100 dark:bg-neutral-800">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Manage Products
      </h1>
      {error && (
        <p className="text-red-500 mb-4 text-sm">
          Error: {error}
        </p>
      )}
      <button
        className="mb-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
        onClick={() => {
          setEditingProduct(null); // Ensure no product is being edited
          setModalOpen(true); // Open the modal for creating a new product
        }}
      >
        Create Product
      </button>

      {/* Product Table */}
      <ProductTable
        products={products}
        onEdit={(id) => {
          const product = products.find((p) => p.id === id);
          setEditingProduct(product || null);
          setModalOpen(true);
        }}
        onDelete={setDeleteProductId}
      />

      {/* Product Modal for Create/Update */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)} // Close modal
        onSubmit={handleSave} // Handle saving the product
        initialData={
          editingProduct
            ? {
                title: editingProduct.title,
                description: editingProduct.description,
                materials: editingProduct.materials,
                category: editingProduct.category,
                price: editingProduct.price,
                images: new DataTransfer().files, // Empty FileList for editing
              }
            : undefined
        }
        loading={loading}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmation
        isOpen={!!deleteProductId} // Open confirmation modal when a product is selected for deletion
        onConfirm={handleDelete} // Handle product deletion
        onCancel={() => setDeleteProductId(null)} // Cancel deletion
      />
    </div>
  );
};

export default AdminProducts;
