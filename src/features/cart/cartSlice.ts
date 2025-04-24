import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartList: [
    { id: 'b1', name: 'bike one' },
    { id: 'a2', name: 'accessoiry two' },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartList.push(action.payload);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
