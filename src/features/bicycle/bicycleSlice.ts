import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../library/api/api';
import axios from 'axios';
import { FetchBicyclesParams } from '../../types/SortingOptions';

const initialState = {
  loading: false,
  bicycles: [],
  error: '',
};

export const fetchBicycles = createAsyncThunk(
  'bicycle/fetchBicycles',
  async ({ sort, direction = 'desc', search }: FetchBicyclesParams) => {
    const params = new URLSearchParams();

    params.set('by', sort); // sorting option
    if (sort === 'highToLow') params.set('direction', direction);
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
