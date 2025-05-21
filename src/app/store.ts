import { configureStore } from '@reduxjs/toolkit';
import bikeReducer from '../features/products/bikeSlice';
import accessoiryReducer from '../features/products/accessorySlice';
import reviewReducer from '../features/reviews/reviewSlice';
import cartReducer from '../features/cart/cartSlice';
import variablePriceSlice from '../features/prices/variablePriceSlice';

const store = configureStore({
  reducer: {
    bicycles: bikeReducer,
    accessories: accessoiryReducer,
    cart: cartReducer,
    reviews: reviewReducer,
    prices: variablePriceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export { store };
