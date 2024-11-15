// src/services/cart.service.ts
import Cart, { ICart } from "../models/cart.schema";
import { Types } from "mongoose";
import { productService } from "./product.service";
import ApiError from "../utils/ApiError";
import { error } from "console";

class CartService {
    // Method to create a new cart
    async createCart(userId: Types.ObjectId, items: ICart["items"], totalPrice: number): Promise<ICart> {
        const newCart = new Cart({ user: userId, items, totalPrice });
        return await newCart.save();
    }

    //add item to the cart
    async addItem(productId: string, quantity: number, userId: Types.ObjectId): Promise<any> {
        // Step 1: Retrieve the product by ID
        const product = await productService.getProductById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        // Step 2: Retrieve the user's cart (create one if it doesn't exist)
        let cart = await cartService.getCartByUserId(userId);
        if (!cart) {
            cart = await cartService.createCart(userId, [], 0);
        }

        // Step 3: Check if the product is already in the cart
        const existingItem = cart.items.find((item) => item.ProductItem.toString() === productId);

        if (existingItem) {
            // Step 4: Update the quantity of the existing item
            existingItem.quantity += quantity;
        } else {
            // Step 5: Add the product as a new item
            cart.items.push({
                ProductItem: new Types.ObjectId(productId), // Ensure it's stored as ObjectId
                ProductName: product.title,
                quantity,
                price: product.price, // Assuming product has a price field
            });
        }

        // Step 6: Recalculate the total price
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        // Step 7: Save the updated cart
        await cart.save();

        return cart;
    }

    // Method to find a cart by user ID
    async getCartByUserId(userId: Types.ObjectId): Promise<ICart | null> {
        return await Cart.findOne({ user: userId });
    }

    //clear the cart
    async clearCart(userId: Types.ObjectId): Promise<any> {
        const cart = await this.getCartByUserId(userId)
        if (cart) {
            cart.items = []
            cart.totalPrice = 0;

            await cart.save();

            return cart;
        }

    }


    async deleteCart(userId: Types.ObjectId): Promise<any> {
        // Find and delete the cart document associated with the userId
        const deletedCart = await Cart.findOneAndDelete({ user: userId });
        return deletedCart;
    }

    //remove an item from the cart
    async removeItem(userId: Types.ObjectId, itemIndex: number): Promise<any> {
        const cart = await this.getCartByUserId(userId)
        if (cart) {
            const itemToRemove = cart.items[itemIndex];
            cart.totalPrice -= itemToRemove.price * itemToRemove.quantity;

            // Remove the item from the cart
            cart.items.splice(itemIndex, 1);

            // Save the updated cart
            await cart.save();

            return cart;
        }

    }


    //delete the cart   
}

export const cartService = new CartService();
