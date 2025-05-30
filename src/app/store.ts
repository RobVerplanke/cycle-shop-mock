import { configureStore } from '@reduxjs/toolkit';
import bikeReducer from '../features/products/bikeSlice';
import accessoryReducer from '../features/products/accessorySlice';
import reviewReducer from '../features/reviews/reviewSlice';
import cartReducer from '../features/cart/cartSlice';
import variablePriceReducer from '../features/prices/variablePriceSlice';

const store = configureStore({
  reducer: {
    bicycles: bikeReducer,
    accessories: accessoryReducer,
    cart: cartReducer,
    reviews: reviewReducer,
    variants: variablePriceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
