import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PRODUCTS_ENDPOINTS } from '../../library/api/api';
import axios from 'axios';
import { SortingOption } from '../../types/SortingOptions';

const initialState = {
  loading: false,
  accessories: [],
  error: '',
};

export const fetchAccessories = createAsyncThunk(
  'accessory/fetchAccessories',
  async (sortOption: SortingOption) => {
    const res = await axios.get(
      `${PRODUCTS_ENDPOINTS.accessories[sortOption]}`
    );
    return res.data;
  }
);

const accessorySlice = createSlice({
  name: 'accessory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAccessories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAccessories.fulfilled, (state, action) => {
      state.loading = false;
      state.accessories = action.payload;
    });
    builder.addCase(fetchAccessories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export const accessoryReducer = accessorySlice.reducer;
