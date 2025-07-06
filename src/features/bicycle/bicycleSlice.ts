import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../library/api/api';
import axios from 'axios';
import { FetchParams } from '../../types/SortingOptions';

const initialState = {
  loading: false,
  allBicycles: [],
  bicycles: [],
  error: '',
};

// Get ALL bike
export const fetchAllBicycles = createAsyncThunk(
  'bicycle/fetchAllBicycles',
  async () => {
    const res = await axios.get(
      `${API_BASE_URL}/products/bike/sorted?by=default`
    );
    return res.data;
  }
);

// Get FILTERED bikes
export const fetchFilteredBicycles = createAsyncThunk(
  'bicycle/fetchFilteredBicycles',
  async ({ sort, direction = 'desc', search }: FetchParams) => {
    const params = new URLSearchParams();

    params.set('by', sort);
    params.set('direction', direction);
    if (search) params.set('search', search);

    const res = await axios.get(
      `${API_BASE_URL}/products/bike/sorted?${params.toString()}`
    );
    return res.data;
  }
);

const bicycleSlice = createSlice({
  name: 'bicycle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllBicycles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilteredBicycles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllBicycles.fulfilled, (state, action) => {
      state.allBicycles = action.payload;
      state.bicycles = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchFilteredBicycles.fulfilled, (state, action) => {
      state.bicycles = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllBicycles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(fetchFilteredBicycles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export const bicycleReducer = bicycleSlice.reducer;
