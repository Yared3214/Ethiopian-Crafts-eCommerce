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
import { useDispatch } from "react-redux"; // Import useDispatch to dispatch actions
import { addToCart } from "@/store/feature/cart/cartSlice"; // Import your addToCart action
import { Product } from "@/types/product";


interface ProductCardProps {
    product: Product;
}

 const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const [quantity, setQuantity] = useState(1); // State for quantity
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
    const dispatch = useDispatch(); // Initialize useDispatch

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setQuantity(value > 0 ? value : 1); // Ensure quantity is at least 1
    };
    const handleAddToCart = () => {
        const cartItem = {
            product: product, // Ensure product is passed as an object inside "product"
            quantity,         // Pass the quantity separately
        };

        // Dispatch addToCart action to the Redux store
        dispatch(addToCart(cartItem));

        console.log("Item added to cart:", cartItem);

        // Close the dialog
        setIsDialogOpen(false);
    };


    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setIsDialogOpen(true)} // Open dialog on button click
                    className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black text-xs sm:text-sm font-bold transition-all duration-300 ease-in-out transform hover:bg-white hover:text-black hover:scale-105 hover:shadow-md"
                    variant="outline"
                >
                    Add to Cart
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add to Cart</DialogTitle>
                    <DialogDescription>
                        Specify the quantity of the item you wish to add to your cart. Click `&quot`Add`&quot` when done.
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
                    <Button type="button" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProductCard;
