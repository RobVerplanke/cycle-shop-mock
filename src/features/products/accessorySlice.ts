import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PRODUCTS_ENDPOINTS } from '../../library/api/api';

// Thunk function that contains async request
export const loadAccessories = createAsyncThunk(
  'accessories/load',
  async () => {
    const res = await fetch(`${PRODUCTS_ENDPOINTS.accessories}`);
    return await res.json();
  }
);

const accessorySlice = createSlice({
  name: 'accessories',
  initialState: { productList: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAccessories.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadAccessories.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload;
      })
      .addCase(loadAccessories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default accessorySlice.reducer;
