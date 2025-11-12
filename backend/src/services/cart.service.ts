// src/services/cart.service.ts
import Cart, { ICart } from "../models/cart.schema";
import { Types } from "mongoose";
import { productService } from "./product.service";
import ApiError from "../utils/ApiError";

class CartService {
    // Create a new cart
    async createCart(userId: Types.ObjectId, items: ICart["items"], totalPrice: number): Promise<ICart> {
        const newCart = new Cart({ user: userId, items, totalPrice });
        return await newCart.save();
    }

    // Add an item to the cart
    async addItem(productId: string, quantity: number, userId: Types.ObjectId): Promise<ICart> {
        // 1. Fetch the product
        const product = await productService.getProductById(productId);
        if (!product) {
            throw new ApiError(404, "Product not found");
        }

        // 2. Get the user's cart (create if not exists)
        let cart = await this.getCartByUserId(userId);
        if (!cart) {
            cart = await this.createCart(userId, [], 0);
        }

        // 3. Check if the product already exists in cart
        const existingItem = cart.items.find(
            (item) => item.ProductItem.toString() === productId
        );

        // 4. Get product image safely
        const productImage = Array.isArray(product.images) && product.images.length > 0
            ? product.images[0]
            : "";

            console.log("Product Image:", productImage);

        if (existingItem) {
            // Update quantity
            existingItem.quantity += quantity;
        } else {
            // Add new item
            cart.items.push({
                ProductItem: new Types.ObjectId(productId),
                productImage, // Safe product image
                ProductName: product.title,
                quantity,
                price: product.price,
            });
        }

        // 5. Recalculate total price
        cart.totalPrice = cart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        // 6. Save and return
        await cart.save();
        return cart;
    }

    // Get cart by user ID
    async getCartByUserId(userId: Types.ObjectId): Promise<ICart | null> {
        return await Cart.findOne({ user: userId });
    }

    // Clear the cart
    async clearCart(userId: Types.ObjectId): Promise<ICart | null> {
        const cart = await this.getCartByUserId(userId);
        if (cart) {
            cart.items = [];
            cart.totalPrice = 0;
            await cart.save();
        }
        return cart;
    }

    // Delete the cart
    async deleteCart(userId: Types.ObjectId): Promise<ICart | null> {
        const deletedCart = await Cart.findOneAndDelete({ user: userId });
        return deletedCart;
    }

    // Remove a single item from the cart
    async removeItem(userId: Types.ObjectId, itemIndex: number): Promise<ICart | null> {
        const cart = await this.getCartByUserId(userId);
        if (!cart) return null;

        if (itemIndex < 0 || itemIndex >= cart.items.length) {
            throw new ApiError(400, "Invalid item index");
        }

        const itemToRemove = cart.items[itemIndex];
        cart.totalPrice -= itemToRemove.price * itemToRemove.quantity;

        cart.items.splice(itemIndex, 1);
        await cart.save();
        return cart;
    }

    //get the cart by cart ID
    async getCartById(cartId: string): Promise<ICart | null> {
        return await Cart.findById(cartId);
    }
    
}

export const cartService = new CartService();
