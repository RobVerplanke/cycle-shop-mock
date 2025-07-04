import { configureStore } from '@reduxjs/toolkit';
import { bicycleReducer } from '../features/bicycle/bicycleSlice';
import { accessoryReducer } from '../features/accessory/accessorySlice';
import { reviewsReducer } from '../features/reviews/reviewSlice';
import { cartReducer } from '../features/cart/cartSlice';

const store = configureStore({
  reducer: {
    bicycles: bicycleReducer,
    accessories: accessoryReducer,
    reviews: reviewsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
