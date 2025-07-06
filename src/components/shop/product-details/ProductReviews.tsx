import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { ReviewFormData, ReviewProps } from '../../../types/Review';
import { useEffect } from 'react';
import { fetchReviews } from '../../../features/reviews/reviewSlice';
import { ReviewRating } from '../ProductRating';

export default function ProductReviews({ item_id, item_type }: ReviewProps) {
  const dispatch = useDispatch<AppDispatch>();

  // Get all reviews for the selected product
  const productReviews = useSelector((state: RootState) =>
    state.reviews.reviews.filter(
      (review: ReviewProps) =>
        review.item_id === item_id && review.item_type === item_type
    )
  );

  // Determine if there are any reviews
  const reviewsLoaded = productReviews.length > 0;

  // Keep reviews up-to-date
  useEffect(() => {
    if (!reviewsLoaded)
      dispatch(fetchReviews({ category: item_type, id: item_id }));
  }, [dispatch, item_id, item_type, reviewsLoaded]);

  // No reviews are written yet for this product
  if (!productReviews.length) {
    return (
      <div className="reviews">
        <div className="review">
          <div className="reviews-form__first">
            <p>Be the first to review </p>
          </div>
        </div>
      </div>
    );
  }

  // There is at least one review written for this product
  return (
    <div className="reviews">
      {productReviews.map((review: ReviewFormData, index) => (
        <div key={index} className="review-card">
          <div className="review-card__header">
            <span className="review-card__name">
              {review.name}
              <ReviewRating review={review} />
            </span>

            <span className="review-card__date">
              {new Date(review.added.replace(' ', 'T')).toLocaleDateString(
                undefined,
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }
              )}
            </span>
          </div>
          <div className="review-card__body">
            <p>{review.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
