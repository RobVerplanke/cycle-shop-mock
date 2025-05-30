import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PRODUCTS_ENDPOINTS } from '../../library/api/api';

// Thunk function that contains async request
export const loadReviews = createAsyncThunk('reviews/load', async () => {
  const res = await fetch(`${PRODUCTS_ENDPOINTS.reviews}`);
  return await res.json();
});

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: { reviewsList: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewsList = action.payload;
      })
      .addCase(loadReviews.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default reviewSlice.reducer;
