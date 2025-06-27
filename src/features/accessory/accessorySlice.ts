import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../library/api/api';
import axios from 'axios';
import { FetchParams } from '../../types/SortingOptions';

const initialState = {
  loading: false,
  allAccessories: [],
  accessories: [],
  error: '',
};

// Get ALL accessories
export const fetchAllAccessories = createAsyncThunk(
  'accessory/fetchAllAccessories',
  async () => {
    const res = await axios.get(
      `${API_BASE_URL}/products/accessory/sorted?by=default`
    );
    return res.data;
  }
);

// Get FILTERED accessories
export const fetchFilteredAccessories = createAsyncThunk(
  'accessory/fetchFilteredAccessories',
  async ({ sort, direction = 'desc', search }: FetchParams) => {
    const params = new URLSearchParams();

    params.set('by', sort);
    params.set('direction', direction);
    if (search) params.set('search', search);

    const res = await axios.get(
      `${API_BASE_URL}/products/accessory/sorted?${params.toString()}`
    );
    return res.data;
  }
);

const accessorySlice = createSlice({
  name: 'accessory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllAccessories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilteredAccessories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllAccessories.fulfilled, (state, action) => {
      state.allAccessories = action.payload;
      state.accessories = action.payload;
    });
    builder.addCase(fetchFilteredAccessories.fulfilled, (state, action) => {
      state.accessories = action.payload;
    });
    builder.addCase(fetchAllAccessories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(fetchFilteredAccessories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export const accessoryReducer = accessorySlice.reducer;
