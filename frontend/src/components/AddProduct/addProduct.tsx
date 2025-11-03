import ProductForm from "../ProductForm/productForm";

export default function AddProduct() {
    const handleAddProduct = (data: any) => {
        // Logic to add product
        console.log("Product added:", data);
    };

    return (
        <div className="w-full">
            <ProductForm onSubmit={handleAddProduct} />
        </div>
    );
}