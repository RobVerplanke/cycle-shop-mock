import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export default function ProductRating({
  id,
  type,
}: {
  id: number;
  type: string;
}) {
  const reviews = useSelector((state: RootState) => state.reviews.reviewList);

  // First get all the ratings for this specific item
  const matchingRatings = reviews
    .filter(
      (review) => review.item_id === id.toString() && review.item_type === type
    )
    .map((review) => review.rating);

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
