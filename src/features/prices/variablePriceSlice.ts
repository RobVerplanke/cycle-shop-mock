import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  variants: [
    {
      id: 1,
      accessory_id: 2,
      size: 'M',
      price: 27.0,
    },
    {
      id: 2,
      accessory_id: 2,
      size: 'L',
      price: 30.0,
    },
    { id: 3, accessory_id: 2, size: 'XL', price: 35.0 },
  ],
};

const variablePriceSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    addPrice: (state, action) => {
      state.variants.push(action.payload);
    },
  },
});

export const { addPrice } = variablePriceSlice.actions;
export default variablePriceSlice.reducer;
