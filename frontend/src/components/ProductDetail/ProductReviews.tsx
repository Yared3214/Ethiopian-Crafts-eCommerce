import { useState } from 'react';
import { FaStar } from 'react-icons/fa'; // Font Awesome icons for stars
import { Review } from '@/types/product';

interface ProductReviewsProps {
  reviews: Review[];
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmitReview = () => {
    // Handle the form submission logic here (e.g., post review to API)
    alert(`Rating: ${rating}, Comment: ${comment}`);
    // Reset form after submission
    setRating(0);
    setComment('');
  };

  return (
    <div className="space-y-6 mb-12 md:space-y-8">
      {/* Main Container: Flex Layout for Larger Screens */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column: Review Form */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4 text-green-700">Leave a Review</h4>
          <div className="flex items-center mb-4">
            <p className="mr-4 font-semibold text-gray-800">Your Rating:</p>
            {/* Render interactive stars for selecting the rating */}
            {[...Array(5)].map((_, starIndex) => (
              <FaStar
                key={starIndex}
                className={`h-6 w-6 cursor-pointer ${starIndex < (hoverRating || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                onMouseEnter={() => setHoverRating(starIndex + 1)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(starIndex + 1)}
              />
            ))}
          </div>

          <textarea
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            rows={4}
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            className="bg-gradient-to-r from-yellow-500 to-red-500 text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity duration-300 shadow-lg"
            onClick={handleSubmitReview}
          >
            Submit Review
          </button>
        </div>

        {/* Right Column: Display User Reviews */}
        <div className="w-full md:w-2/3">
          {/* Display Existing Reviews */}
          {reviews?.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border-l-4 border-yellow-600 p-4 rounded-md shadow-md bg-white mb-4">
                <p className="text-red-700 font-semibold">{review.user}</p>
                <div className="flex items-center mb-2">
                  {/* Render stars based on the rating */}
                  {[...Array(5)].map((_, starIndex) => (
                    <FaStar
                      key={starIndex}
                      className={`h-5 w-5 ${starIndex < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet. Be the first to leave a review!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
