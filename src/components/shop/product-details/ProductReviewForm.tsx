import { useForm } from 'react-hook-form';
import SetRating from './SetRating';
import { ReviewFormData, ReviewProps } from '../../../types/Review';
import axios from 'axios';

export default function ProductReviewForm({ item_id, item_type }: ReviewProps) {
  const { register, handleSubmit, watch, reset } = useForm<ReviewFormData>();
  const rating = watch('rating');

  async function onSubmit(data: ReviewFormData) {
    const payload = {
      ...data,
      item_id: item_id,
      item_type: item_type,
    };

    try {
      const res = await axios.post('/api/reviews', payload);
      console.log('Review submitted:', res.data);
      reset(); // Clear form after submit
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
