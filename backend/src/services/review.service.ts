import Review, { IReview } from '../models/review.schema';
import Product, { IProduct } from '../models/product.schema';


class ReviewService {

    async createReview(review: string, rating: number, user: string, product: string): Promise<IReview> {
        const newReview = new Review({
            user,
            product,
            comment: review,
            rating
        });
        await newReview.save();
        return newReview;
    }


    async getReviewById(reviewId: string): Promise<IReview | null> {
        return Review.findById(reviewId);
    }

    async getReviewsByProductId(productId: string): Promise<IReview[]> {
        return Review.find({ product: productId }).sort({ updatedAt: -1 });
    }
    
    async calculateUpdatedRating(productId: string): Promise<IProduct | null> {
        const reviews = await this.getReviewsByProductId(productId);
        const totalReviews = reviews.length;
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        console.log({ totalRating });
        console.log({ totalReviews });
        const updatedRating = (totalRating) / (totalReviews);

        const updatedProduct = await Product.findByIdAndUpdate(productId, { rating: updatedRating });
        return updatedProduct;
    }

    async updateReview(
        reviewId: string,
        review?: string,
        rating?: number
      ): Promise<IReview | null> {
        // Prepare the fields to be updated
        const updateFields: Partial<{ comment: string; rating: number }> = {};
        if (review) updateFields.comment = review;
        if (rating) updateFields.rating = rating;
      
        // Update the review with only the provided fields
        return Review.findByIdAndUpdate(
          reviewId,
          updateFields,
          { new: true }
        );
      }

    async deleteReview(reviewId: string): Promise<IReview | null> {
        return Review.findByIdAndDelete(reviewId);
    }
      

}



export const reviewService = new ReviewService();