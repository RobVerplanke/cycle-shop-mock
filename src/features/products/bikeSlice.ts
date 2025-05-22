import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PRODUCTS_ENDPOINTS } from '../../library/api/api';

// Thunk function that contains async request
export const loadBicycles = createAsyncThunk('bicycles/load', async () => {
  const res = await fetch(`${PRODUCTS_ENDPOINTS.bikes}`);
  return await res.json();
});

const bikeSlice = createSlice({
  name: 'bicycles',
  initialState: { productList: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBicycles.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadBicycles.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload;
      })
      .addCase(loadBicycles.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default bikeSlice.reducer;
