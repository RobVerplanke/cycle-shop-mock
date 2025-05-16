import { configureStore } from '@reduxjs/toolkit';
import bikeReducer from '../features/products/bikeSlice';
import accessoiryReducer from '../features/products/accessorySlice';
import cartReducer from '../features/cart/cartSlice';

const store = configureStore({
  reducer: {
    bicycles: bikeReducer,
    accessories: accessoiryReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export { store };
