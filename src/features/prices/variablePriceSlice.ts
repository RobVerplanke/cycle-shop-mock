import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PRODUCTS_ENDPOINTS } from '../../library/api/api';

// Thunk function that contains async request
export const loadItems = createAsyncThunk('variants/load', async () => {
  const res = await fetch(`${PRODUCTS_ENDPOINTS.variants}`);
  return await res.json();
});

const variablePriceReducer = createSlice({
  name: 'variants',
  initialState: { variants: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadItems.fulfilled, (state, action) => {
        state.loading = false;
        state.variants = action.payload;
      })
      .addCase(loadItems.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default variablePriceReducer.reducer;
