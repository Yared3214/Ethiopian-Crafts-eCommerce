import { Response, Request } from 'express';
import ApiError from "../utils/ApiError";
import { reviewService } from '../services/review.service';
import { userService } from '../services/user.service';
import { productService } from '../services/product.service';


//create review 

interface AuthenticatedRequest extends Request {
    user: {
        _id: string;
        // Add any other user properties if needed
    };
}

export const createReview = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const { review, rating } = req.body;
        const { productId } = req.params;
        const userID = req.user._id;


        console.log('userid', userID)
        //check if the user exists
        const isUserExist = await userService.getUserById(userID);
        if (!isUserExist) {
            return new ApiError(400, "User not found").send(res);
        }

        //check if the product exists
        const isProductExist = await productService.getProductById(productId);
        if (!isProductExist) {
            return new ApiError(400, "Product not found").send(res);
        }

        //check if the review and rating are provided
        if (!review || !rating) {
            return new ApiError(400, "Review and rating are required").send(res);
        }

        //check if the user has already reviewed the product
        const existingReview = await reviewService.getReviewsByProductId(productId);
        console.log({ existingReview })
        const isAlreadyReviewed = existingReview.some(review => review.user.toString() === userID.toString());
        console.log("isAlreadyReviewed", isAlreadyReviewed)
        if (isAlreadyReviewed) {
            return new ApiError(400, "You have already reviewed this product").send(res);
        }

        //create review
        const newReview = await reviewService.createReview(review, rating, userID, productId);
        if (!newReview) {
            return new ApiError(400, "Review not created").send(res);
        }

        //update the product rating
        const updatedProduct = await reviewService.calculateUpdatedRating(productId);
        if (!updatedProduct) {
            return new ApiError(400, "Product rating not updated").send(res);
        }

        return res.status(201).json({
            success: "true",
            message: "Review created successfully.",
            review: newReview
        });

    } catch (error) {
        console.error('Error creating review:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
}

//get all reviews of a product

export const getReviewsByProductId = async (req: Request, res: Response): Promise<any> => {
    try {
        const { productId } = req.params;

        //check if the product found
        const isProductExist = await productService.getProductById(productId);
        if (!isProductExist) {
            return new ApiError(400, "Product not found").send(res);
        }

        const reviews = await reviewService.getReviewsByProductId(productId);

        if (!reviews.length) {
            return new ApiError(400, "Reviews not found").send(res);
        }

        return res.status(200).json({
            success: "true",
            message: "Reviews found successfully.",
            reviews
        });

    } catch (error) {
        console.error('Error getting reviews:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
}

//update my review
export const updateReview = async (req: AuthenticatedRequest, res: Response): Promise<any> => {

    try {
        const { review, rating } = req.body;
        const { reviewId } = req.params;
        const userId = req.user._id

        //check if the review exist 
        const reviewExist = await reviewService.getReviewById(reviewId)
        if (!reviewExist) {
            return new ApiError(400, 'Review not found to be updated.').send(res)
        }

        //check if the user is authorized to update the review
        const isAuthrorized = reviewExist.user.toString() === userId.toString();
        if (!isAuthrorized) {
            return new ApiError(400, "You are not authorized to update this review.").send(res);
        }



        //update the review
        const updatedReview = await reviewService.updateReview(reviewId, review, rating);
        if (!updatedReview) {
            return new ApiError(400, "Review not updated").send(res);
        }

        //update the product rating
        const updatedProduct = await reviewService.calculateUpdatedRating(reviewExist.product.toString());
        if (!updatedProduct) {
            return new ApiError(400, "Product rating not updated").send(res);
        }


        return res.status(200).json({
            success: "true",
            message: "Review updated successfully.",
            review: updatedReview
        });


    } catch (error) {
        console.error('Error updating review:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
}


//delete review 

export const deleteReview = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const { reviewId } = req.params;
        const userId = req.user._id

        //check if the review exist 
        const reviewExist = await reviewService.getReviewById(reviewId)
        if (!reviewExist) {
            return new ApiError(400, 'Review not found to be deleted.').send(res)
        }

        //check if the user is authorized to delete the review
        const isAuthrorized = reviewExist.user.toString() === userId.toString();
        if (!isAuthrorized) {
            return new ApiError(400, "You are not authorized to delete this review.").send(res);
        }

        //delete the review
        const deletedReview = await reviewService.deleteReview(reviewId);
        if (!deletedReview) {
            return new ApiError(400, "Review not deleted").send(res);
        }

        //update the product rating
        const updatedProduct = await reviewService.calculateUpdatedRating(reviewExist.product.toString());
        if (!updatedProduct) {
            return new ApiError(400, "Product rating not updated").send(res);
        }

        return res.status(200).json({
            success: "true",
            message: "Review deleted successfully.",
        });

    } catch (error) {
        console.error('Error deleting review:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }

}