import { FaStar } from 'react-icons/fa6';
import { SetRatingProps } from '../../../types/Review';

export default function SetRating({ register, currentRating }: SetRatingProps) {
  const totalStars = 5;

  return (
    <>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              value={starValue}
              {...register('rating', { valueAsNumber: true })}
              style={{ display: 'none' }}
            />
            <span
              className="star"
              style={{
                color: starValue <= (currentRating ?? 0) ? 'black' : '#e4e5e9',
                cursor: 'pointer',
              }}
            >
              <FaStar fontSize="medium" />
            </span>
          </label>
        );
      })}
    </>
  );
}
