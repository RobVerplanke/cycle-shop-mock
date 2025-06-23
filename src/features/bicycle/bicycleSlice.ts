import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PRODUCTS_ENDPOINTS } from '../../library/api/api';
import axios from 'axios';
import { SortingOption } from '../../types/SortingOptions';

const initialState = {
  loading: false,
  bicycles: [],
  error: '',
};

export const fetchBicycles = createAsyncThunk(
  'bicycle/fetchBicycles',
  async (sortOption: SortingOption) => {
    const res = await axios.get(`${PRODUCTS_ENDPOINTS.bicycles[sortOption]}`);
    return res.data;
  }
);

const bicycleSlice = createSlice({
  name: 'bicycle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBicycles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBicycles.fulfilled, (state, action) => {
      state.loading = false;
      state.bicycles = action.payload;
    });
    builder.addCase(fetchBicycles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export const bicycleReducer = bicycleSlice.reducer;
