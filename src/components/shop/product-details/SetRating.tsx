import { FaStar } from 'react-icons/fa6';
import { SetRatingProps } from '../../../types/Review';
import { MAX_AMOUNT_STARS } from '../../../library/constants';

export default function SetRating({ register, currentRating }: SetRatingProps) {
  // Set maximum amount of rating stars/points
  const totalStars = MAX_AMOUNT_STARS;

  return (
    <div role="radiogroup" aria-label="Geef een beoordeling">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              value={starValue}
              {...register('rating', {
                valueAsNumber: true,
                required: 'Rating is required',
              })}
              className="visually-hidden"
            />
            <span
              role="radio"
              aria-checked={currentRating === starValue}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const targetInput = e.currentTarget
                    .previousElementSibling as HTMLInputElement;
                  targetInput?.click();
                }
              }}
              onClick={(e) => {
                const targetInput = e.currentTarget
                  .previousElementSibling as HTMLInputElement;
                targetInput?.click();
              }}
              style={{
                color: starValue <= (currentRating ?? 0) ? 'black' : '#e4e5e9',
                cursor: 'pointer',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '2px solid #000'; // of je eigen stijl
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              <FaStar fontSize="medium" />
            </span>
          </label>
        );
      })}
    </div>
  );
}
