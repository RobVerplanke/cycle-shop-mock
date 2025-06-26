import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../library/api/api';
import axios from 'axios';
import { SortingOption } from '../../types/SortingOptions';

const initialState = {
  loading: false,
  accessories: [],
  error: '',
};

type FetchAccessoriesParams = {
  sort: SortingOption;
  direction?: 'asc' | 'desc';
  search?: string;
};

export const fetchAccessories = createAsyncThunk(
  'accessory/fetchAccessories',
  async ({ sort, direction = 'desc', search }: FetchAccessoriesParams) => {
    const params = new URLSearchParams();

    params.set('by', sort); // sorting option
    if (sort === 'highToLow') params.set('direction', direction);
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
