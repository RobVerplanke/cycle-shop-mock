import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../library/api/api';
import axios from 'axios';
import { ReviewCategory } from '../../types/Review';

const initialState = {
  loading: false,
  reviews: [],
  error: '',
};

export const fetchReviews = createAsyncThunk(
  'review/fetchReviews',
  async ({ category, id }: { category: ReviewCategory; id: number }) => {
    const res = await axios.get(
      `${API_BASE_URL}/products/${category}/${id}/reviews`
    );
    return res.data;
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    });
    builder.addCase(fetchReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export const reviewsReducer = reviewSlice.reducer;
