import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { useState } from "react"
import ProductForm from "../ProductForm/productForm";
  
  export function UpdateProductDialog({ product }: { product: any }) {
    const [open, setOpen] = useState(false)
    const handleUpdateProduct = (data: any) => {
        // Logic to update product
        console.log("Product updated:", data);
    };
  
    return (
        <div className="w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary">Update</Button>
        </DialogTrigger>
  
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update product details and save changes.
            </DialogDescription>
          </DialogHeader>
  
          {/* ✅ Your product form with existing data */}
          <div className="w-full overflow-y-auto max-h-[75vh]">
            <ProductForm initialData={product} onSubmit={handleUpdateProduct} />
        </div>
        </DialogContent>
      </Dialog>
      </div>
    )
  }
  