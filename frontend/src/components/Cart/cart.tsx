import React, { useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BsCart4 } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addToCart, removeItem, clearCart, setCartItems } from '@/store/feature/cart/cartSlice';
import useCart from '@/hooks/useCart';
import { CartItem } from '@/types/cart';

const Cart: React.FC = () => {
    const dispatch = useDispatch();

    // Getting the user's token and cart items from Redux
    const user = useSelector((state: RootState) => state.user.user);
    const accessToken = user?.tokens?.access?.token;

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

    const { fetchMyCart } = useCart(); // Custom hook to fetch the cart

    // Fetch cart items on component mount
    useEffect(() => {
        if (accessToken) {
            const fetchCartItems = async () => {
                const data = await fetchMyCart(accessToken);
                if (data) {
                    dispatch(setCartItems(data)); // Assuming fetchMyCart returns the necessary data format
                }
            };
            fetchCartItems();
        }
    }, [accessToken, dispatch, fetchMyCart]);

    // Handle remove item from cart
    const handleDeleteItem = (id: string) => {
        dispatch(removeItem(id));
    };

    // Clear all items from the cart
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // Placeholder for checkout action
    const handleCheckout = () => {
        alert("Proceeding to checkout!");
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="relative p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                    <BsCart4 className="text-xl" />
                    {cartItems.length > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {cartItems.length}
                        </span>
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Shopping Cart</h2>
                        <button
                            onClick={handleClearCart}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Clear
                        </button>
                    </div>
                    {cartItems.length > 0 ? (
                        <ul className="space-y-3">
                            {cartItems.map(item => (
                                <li
                                    key={item.ProductItem.toString()}
                                    className="flex justify-between items-center p-2 border border-gray-200 rounded shadow-sm"
                                >
                                    <div>
                                        <p className="font-semibold">{item.ProductName}</p>
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        <p className="text-sm text-gray-600">Price: ${item.price}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteItem(item.ProductItem.toString())}
                                        className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    )}
                    {cartItems.length > 0 && (
                        <>
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center font-semibold">
                                    <p>Total:</p>
                                    <p>${totalPrice.toFixed(2)}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition font-semibold"
                            >
                                Checkout
                            </button>
                        </>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default Cart;
