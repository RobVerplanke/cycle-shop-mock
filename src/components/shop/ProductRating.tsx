import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Review } from '../../types/Review';

export default function ProductRating({
  id,
  type,
}: {
  id: number;
  type: string;
}) {
  // Get all reviews
  const reviews: Review[] = useSelector(
    (state: RootState) => state.reviews.reviewsList
  );

  // Get all the ratings for this specific item
  const matchingRatings = reviews
    .filter((review) => review.item_id === id && review.item_type === type)
    .map((review) => Number(review.rating));

  // Calculate the average rating
  const averageRating = matchingRatings.length
    ? matchingRatings.reduce((acc, val) => acc + val, 0) /
      matchingRatings.length
    : 0;

  // Convert the rating (number) to the corresponding amount of stars by rounding the number
  const fullStars = Math.ceil(averageRating);

  return (
    <div>
      {Array.from({ length: 5 }, (_, i) =>
        i < fullStars ? (
          <FaStar key={i} fontSize="medium" />
        ) : (
          <FaRegStar key={i} fontSize="medium" />
        )
      )}
    </div>
  );
}
