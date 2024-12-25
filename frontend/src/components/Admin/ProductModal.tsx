import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  title: string;
  description: string;
  materials: string;
  category: string;
  price: number;
  images: FileList;
};

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<FormData>;
  initialData?: FormData;
  loading: boolean;
};

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  loading,
}) => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: initialData || {},
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">
          {initialData ? "Edit Product" : "Create Product"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            className="w-full border px-4 py-2 rounded-md"
          />
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Description"
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            {...register("materials", { required: "Materials are required" })}
            placeholder="Materials (comma-separated)"
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            {...register("category", { required: "Category is required" })}
            placeholder="Category"
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            placeholder="Price"
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="file"
            {...register("images")}
            multiple
            className="w-full border px-4 py-2 rounded-md"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="text-gray-600 hover:underline"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
