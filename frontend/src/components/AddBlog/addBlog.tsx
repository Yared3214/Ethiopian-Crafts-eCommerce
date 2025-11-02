import BlogForm from "../BlogForm/blogForm";

export default function AddBlog() {
    const handleAddBlog = (data: any) => {
        // Logic to add product
        console.log("Product added:", data);
    };

    return (
        <div className="w-full">
            <BlogForm onSubmit={handleAddBlog} />
        </div>
    );
}