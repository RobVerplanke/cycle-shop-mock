import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PRODUCTS_ENDPOINTS } from '../../library/api/api';

// Thunk function that contains async request
export const loadItems = createAsyncThunk('accessories/load', async () => {
  const res = await fetch(`${PRODUCTS_ENDPOINTS.accessories}`);
  return await res.json();
});

const accessorySlice = createSlice({
  name: 'accessories',
  initialState: { productList: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadItems.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload;
      })
      .addCase(loadItems.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default accessorySlice.reducer;

// const initialState = [
//   {
//     id: 1,
//     type: 'Accessories',
//     name: 'Bicycle Gloves Blue',
//     introduction:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     image_url:
//       'https://websitedemos.net/cycle-shop-02/wp-content/uploads/sites/789/2021/04/accessories-4.jpg',
//     category: 'gloves',
//   },
//   {
//     id: 2,
//     type: 'Accessories',
//     name: 'Bicycle Gloves Gold',
//     introduction:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     image_url:
//       'https://websitedemos.net/cycle-shop-02/wp-content/uploads/sites/789/2021/03/accessories-4.jpg',
//     category: 'gloves',
//   },
// ];
// const accessoirySlice = createSlice({
//   name: 'accessoires',
//   initialState,
//   reducers: {
//     addAccessoiry: (state, action) => {
//       state.productList.push(action.payload);
//     },
//   },
// });
