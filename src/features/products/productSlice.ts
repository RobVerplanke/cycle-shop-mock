import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PRODUCTS_ENDPOINTS } from '../../library/api/api';
import { SortingOptions } from '../../types/SortingOptions';
import { ShopCategories } from '../../types/Product';

// Thunk function that contains async request
export const loadProducts = createAsyncThunk(
  'products/load',
  async ({
    sortingOption,
    category,
  }: {
    sortingOption: SortingOptions;
    category: ShopCategories | undefined;
  }) => {
    if (!category) throw new Error('No category provided');

    let res;
    if (category === 'bicycles')
      res = await fetch(`${PRODUCTS_ENDPOINTS.bicycles[sortingOption]}`);
    if (category === 'accessories')
      res = await fetch(`${PRODUCTS_ENDPOINTS.accessories[sortingOption]}`);

    const data = res ? await res.json() : [];
    return { category, data };
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    productList: {
      bicycles: [],
      accessories: [],
    },
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        if (category) {
          state.productList[category] = data;
          state.loading = false;
        }
      })
      .addCase(loadProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
