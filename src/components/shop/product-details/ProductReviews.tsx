import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { ReviewFormData, ReviewProps } from '../../../types/Review';
import { useEffect } from 'react';
import { fetchReviews } from '../../../features/reviews/reviewSlice';

export default function ProductReviews({ item_id, item_type }: ReviewProps) {
  const dispatch = useDispatch<AppDispatch>();

  const productReviews = useSelector((state: RootState) =>
    state.reviews.reviews.filter(
      (review: ReviewProps) =>
        review.item_id === item_id && review.item_type === item_type
    )
  );
  const reviewsLoaded = productReviews.length > 0;

  useEffect(() => {
    if (!reviewsLoaded)
      dispatch(fetchReviews({ category: item_type, id: item_id }));
  }, [dispatch, item_id, item_type, reviewsLoaded]);

  const allReviews = useSelector((state: RootState) => state.reviews.reviews);

  console.log('item_id (from props):', item_id, typeof item_id);
  console.log('item_type (from props):', item_type, typeof item_type);

  allReviews.forEach((review: ReviewFormData) => {
    console.log('review.item_id:', review.item_id, typeof review.item_id);
    console.log('review.item_type:', review.item_type, typeof review.item_type);
  });

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

  return (
    <div className="reviews">
      {productReviews.map((review: ReviewFormData, index) => (
        <div key={index} className="review-card">
          <div className="review-card__header">
            <span className="review-card__name">{review.name}</span>
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
