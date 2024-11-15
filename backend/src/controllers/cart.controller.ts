import { Request, Response } from 'express';
import { cartService } from '../services/cart.service';
import ApiError from '../utils/ApiError';
import { productService } from '../services/product.service';
import { authenticatedRequest } from '../middlewares/authMiddleware';



export const addItemToCart = async (req: authenticatedRequest, res: Response): Promise<any> => {
    console.log("Request body: ", req.body);

    try {

        const { productId } = req.params;
        const { quantity } = req.body;

        const userId = req.user._id;

        if (!quantity) {
            return new ApiError(400, "Quantity is required").send(res);
        }

        //find the price of the product
        const product = await productService.getProductById(productId)
        if (!product) {
            return new ApiError(400, "Product not found").send(res);
        }


        const cart = await cartService.addItem(productId, quantity, userId)
        if (cart) {
            return res.status(200).json({ message: 'Item added to cart', cart });
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
};


export const clearCart = async (req: authenticatedRequest, res: Response): Promise<any> => {

    try {
        const userId = req.user._id;

        const cart = await cartService.getCartByUserId(userId)
        if (!cart) {
            return new ApiError(400, "Cart not found").send(res)
        }

        const clearCart = await cartService.clearCart(userId)
        if (clearCart) {
            return res.status(200).json({ message: "Cart cleared successfully!" })
        }
    } catch (error: any) {
        console.log("error while clearing the cart", error)
        return new ApiError(500, 'Internal server error').send(res);
    }


}

export const deleteCart = async (req: authenticatedRequest, res: Response): Promise<any> => {
    try {
        const userId = req.user._id
        const cart = await cartService.deleteCart(userId)
        if (!cart) {
            return new ApiError(400, "cart not found").send(res)
        }
        const deletedCart = await cartService.deleteCart(userId)
        if (deletedCart) {
            res.status(200).json({ message: "Cart successfully deleted." })
        }
    } catch (error) {
        console.error("error while deleting the cart", error)
        return new ApiError(500, "Internal server error").send(res)
    }
}


export const removeItem = async (req: authenticatedRequest, res: Response): Promise<any> => {
    // Retrieve the user's cart
    const userId = req.user._id
    const { productId } = req.params

    const cart = await cartService.getCartByUserId(userId);
    if (!cart) {
        return new ApiError(400, "Cart not found").send(res)
    }

    // Find the index of the item to be removed
    const itemIndex = cart.items.findIndex((item) => item.ProductItem.toString() === productId);

    if (itemIndex === -1) {
        return new ApiError(400, "Item not found in the cart").send(res)
    }

    const newCart = await cartService.removeItem(userId, itemIndex)
    if (newCart) {
        return res.status(200).json({ message: "Item successfully removed from the cart.", newCart })
    }
}
