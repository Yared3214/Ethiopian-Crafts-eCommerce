"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductResponse } from "@/types/product";
import { showToast } from "nextjs-toast-notify";
import { createCartRequest } from "@/api/cart/cartAPI";

interface ProductCardProps {
  product: ProductResponse;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value > 0 ? value : 1);
  };

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      // ✅ Call API to add to cart
      await createCartRequest(product._id, quantity);

      // ✅ Show success toast
      showToast.success(`${product.title} added to cart!`, {
        duration: 4000,
        position: "bottom-right",
      });

      // ✅ Trigger cart refresh event (CartPopover listens for this)
      window.dispatchEvent(new Event("cartUpdated"));

      setIsDialogOpen(false);
    } catch (error: any) {
      console.error("Failed to add to cart:", error);

      // ✅ Error toast
      showToast.error(
        error?.response?.data?.message || "Failed to add item to cart",
        {
          duration: 4000,
          position: "bottom-right",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black text-xs sm:text-sm font-bold transition-all duration-300 ease-in-out transform hover:bg-white hover:text-black hover:scale-105 hover:shadow-md"
          variant="outline"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Cart</DialogTitle>
          <DialogDescription>
            Specify the quantity of the item you wish to add to your cart. Click
            "Add" when done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleAddToCart} disabled={loading}>
            {loading ? "Adding..." : "Add to Cart"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCard;
