import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productList: [
    {
      id: 'a1',
      name: 'accessoiry one',
      description: 'Description of accessoiry one',
      price: 30,
    },
    {
      id: 'a2',
      name: 'accessoiry two',
      description: 'Description of accessoiry one',
      price: 35,
    },
  ],
};

const accessoirySlice = createSlice({
  name: 'accessoires',
  initialState,
  reducers: {
    addAccessoiry: (state, action) => {
      state.productList.push(action.payload);
    },
  },
});

export const { addAccessoiry } = accessoirySlice.actions;
export default accessoirySlice.reducer;
