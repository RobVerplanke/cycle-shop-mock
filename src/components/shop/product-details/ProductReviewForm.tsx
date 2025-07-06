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
  const { register, handleSubmit, watch, reset } = useForm<ReviewFormData>();
  const rating = watch('rating');

  // Send data to the back-end server
  async function onSubmit(data: ReviewFormData) {
    // Add additional required data to the form data
    const payload = {
      ...data,
      item_id: item_id,
      item_type: item_type,
      rating: Number(rating),
    };

    try {
      // Send extended data to back-end
      await axios.post(`${API_BASE_URL}/api/reviews`, payload);

      // Update reviews with the new review
      dispatch(fetchReviews({ category: item_type, id: item_id }));

      // Clear form after submit
      reset();
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="reviews-form__info">
        <p>
          Your email address will not be published. Required fields are marked*
        </p>
      </div>
      {/* const { item_id, item_type, name, email, review, rating } = req.body; */}
      <div className="reviews-form__rating">
        <div className="reviews-form__rating__title">
          <p>Your rating *</p>
        </div>
        <div className="reviews-form__rating__start">
          <SetRating register={register} currentRating={rating} />
        </div>
      </div>

      <div className="reviews-form__review">
        <div className="reviews-form__review__content">
          <div className="reviews-form__review__content__title">
            <p>Your review *</p>
          </div>
          <div className="reviews-form__review__inputfield">
            <textarea {...register('review')} id=""></textarea>
          </div>
        </div>

        <div className="reviews-form__review__userdata">
          <div className="reviews-form__review__userdata__name">
            <p>Name *</p>
            <input type="text" {...register('name')} id="" />
          </div>
          <div className="reviews-form__review__userdata__email">
            <p>Email *</p>
            <input type="text" {...register('email')} id="" />
          </div>
        </div>

        <div className="reviews-form__review__checkbox">
          <div className="reviews-form__review__checkbox__input">
            <input type="checkbox" name="" id="" />
          </div>
          <div className="reviews-form__review__checkbox__option">
            Save my name, email, and website in this browser for the next time I
            comment.
          </div>
        </div>
      </div>
      <button type="submit">SUBMIT</button>
    </form>
  );
}
