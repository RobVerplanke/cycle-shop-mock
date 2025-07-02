import { UseFormRegister } from 'react-hook-form';

export type ReviewFormData = {
  item_type: string;
  item_id: number;
  rating: number;
  review: string;
  name: string;
  email: string;
  added: string;
};

export type SetRatingProps = {
  register: UseFormRegister<ReviewFormData>;
  currentRating?: number;
};

export type ReviewCategory = 'bike' | 'accessory';

export type ReviewProps = {
  item_type: ReviewCategory;
  item_id: number;
};

export type TabButtons = 'description' | 'additional' | 'reviews';
