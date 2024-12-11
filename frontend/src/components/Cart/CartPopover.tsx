import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ShoppingCart } from "lucide-react"; // Import cart icon
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch
import { RootState } from "@/store/store"; // Import RootState to access the store's state
import { selectCartItemCount } from "@/store/feature/cart/cartSlice";
import { removeFromCart, clearCart } from "@/store/feature/cart/cartSlice"; // Import the remove and clear actions

const CartPopover: React.FC = () => {
    const dispatch = useDispatch(); // To dispatch actions

    // Get the cartItems from Redux store using useSelector
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    // Calculate the number of distinct items in the cart
    const cartItemCount = useSelector(selectCartItemCount);

    const handleRemoveItem = (productId: string) => {
        dispatch(removeFromCart(productId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleCheckout = () => {
        // Implement your checkout logic here
        console.log("Proceed to checkout...");
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                        {cartItemCount}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg relative">
                {/* Clear Cart Button at the top right */}
                {cartItems.length > 0 && (
                    <button
                        onClick={handleClearCart}
                        className="flex absolute top-2 right-2 justify-center items-center gap-2 w-16 h-9 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                    >
                        Clear
                    </button>
                )}

                <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Your Cart</h4>

                    {/* Cart Items */}
                    <div className="space-y-3">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div
                                    key={item.product._id}
                                    className="flex items-center justify-between border-b py-3 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
                                >
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={item.product.images[0]}
                                            alt={item.product.title}
                                            className="w-10 h-10 object-cover rounded-md"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{item.product.title}</span>
                                            <span className="text-xs text-gray-500">Quantity: {item.quantity}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item.product._id)}

                                        className="group relative flex h-9 w-9 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600"
                                    >
                                        <svg
                                            viewBox="0 0 1.625 1.625"
                                            className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                                            height="10"
                                            width="10"
                                        >
                                            <path
                                                d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"
                                            ></path>
                                            <path
                                                d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"
                                            ></path>
                                            <path
                                                d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"
                                            ></path>
                                        </svg>
                                        <svg
                                            width="16"
                                            fill="none"
                                            viewBox="0 0 39 7"
                                            className="origin-right duration-500 group-hover:rotate-90"
                                        >
                                            <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
                                            <line
                                                stroke-width="3"
                                                stroke="white"
                                                y2="1.5"
                                                x2="26.0357"
                                                y1="1.5"
                                                x1="12"
                                            ></line>
                                        </svg>
                                        <svg width="16" fill="none" viewBox="0 0 33 39" className="">
                                            <mask fill="white" id="path-1-inside-1_8_19">
                                                <path
                                                    d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                                ></path>
                                            </mask>
                                            <path
                                                mask="url(#path-1-inside-1_8_19)"
                                                fill="white"
                                                d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                            ></path>
                                            <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                                            <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                                        </svg>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 p-6 border-t-2 border-gray-300 bg-gray-100 rounded-md">
                                <span className="text-xl font-semibold text-gray-700">Your cart is empty</span>
                                <p className="text-sm text-gray-500 mt-2">
                                    It looks like you haven't added anything to your cart yet. Start shopping and fill it up!
                                </p>
                                <button
                                    className="mt-4 px-6 py-2 bg-gradient-to-r from-teal-400 to-teal-600 text-white font-medium rounded-lg hover:scale-105 transition duration-300"
                                    onClick={() => console.log("Redirect to shopping...")}
                                >
                                    Start Shopping
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Show these buttons only if cart has items */}
                    {cartItems.length > 0 && (
                        <div className="space-y-3">
                            <Button
                                className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium text-base rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:from-green-600 hover:to-teal-600"
                                onClick={handleCheckout}
                            >
                                <span className="flex items-center justify-center space-x-3">
                                    <ShoppingCart className="w-5 h-5" />
                                    <span>Proceed to Checkout</span>
                                </span>
                            </Button>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>

    );
};

export default CartPopover;
