import { useForm } from 'react-hook-form';
import SetRating from './SetRating';
import { ReviewFormData, ReviewProps } from '../../../types/Review';
import axios from 'axios';
import { API_BASE_URL } from '../../../library/api/api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { fetchReviews } from '../../../features/reviews/reviewSlice';

export default function ProductReviewForm({ item_id, item_type }: ReviewProps) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>();
  const rating = watch('rating');

  async function onSubmit(data: ReviewFormData) {
    const payload = {
      ...data,
      item_id: item_id,
      item_type: item_type,
      rating: Number(rating),
    };

    try {
      await axios.post(`${API_BASE_URL}/api/reviews`, payload);
      dispatch(fetchReviews({ category: item_type, id: item_id }));
      reset();
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="reviews-form__info">
        <p>
          Your email address will not be published. Required fields are marked{' '}
          <span aria-hidden="true">*</span>
        </p>
      </div>

      <fieldset
        className="reviews-form__rating"
        aria-required="true"
        aria-invalid={errors.rating ? 'true' : 'false'}
      >
        <legend>
          Your rating <span aria-hidden="true">*</span>
        </legend>
        <SetRating register={register} currentRating={rating} />
        {errors.rating && (
          <p className="error-message" role="alert" id="rating-error">
            {errors.rating.message || 'Rating is required'}
          </p>
        )}
      </fieldset>

      <fieldset className="reviews-form__review">
        <legend>
          Your review <span aria-hidden="true">*</span>
        </legend>
        <div className="reviews-form__review__inputfield">
          <label htmlFor="review-text" className="sr-only">
            Review text
          </label>
          <textarea
            id="review-text"
            {...register('review', { required: 'Review is required' })}
            aria-invalid={errors.review ? 'true' : 'false'}
            aria-describedby={errors.review ? 'review-error' : undefined}
            rows={5}
          />
          {errors.review && (
            <p className="error-message" role="alert" id="review-error">
              {errors.review.message}
            </p>
          )}
        </div>

        <div className="reviews-form__review__userdata">
          <div className="reviews-form__review__userdata__name">
            <label htmlFor="review-name">
              Name <span aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="review-name"
              {...register('name', { required: 'Name is required' })}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p className="error-message" role="alert" id="name-error">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="reviews-form__review__userdata__email">
            <label htmlFor="review-email">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              id="review-email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Please enter a valid email address',
                },
              })}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p className="error-message" role="alert" id="email-error">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="reviews-form__review__checkbox">
          <input type="checkbox" id="save-info" />
          <label htmlFor="save-info">
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </div>
      </fieldset>

      <button type="submit">SUBMIT</button>
    </form>
  );
}
