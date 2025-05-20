import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviewList: [
    {
      id: 1,
      item_type: 'Accessories',
      item_id: '2',
      rating: 4,
      review:
        'Accessories lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      name: 'Rob Verplanke',
      email: 'rob@mail.com',
    },
    {
      id: 2,
      item_type: 'Bicycles',
      item_id: '3',
      rating: 3,
      review:
        'Bicycles lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      name: 'Robbie Verplanke',
      email: 'robbie@mail.com',
    },
  ],
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action) => {
      state.reviewList.push(action.payload);
    },
  },
});

export const { addReview } = reviewSlice.actions;
export default reviewSlice.reducer;
