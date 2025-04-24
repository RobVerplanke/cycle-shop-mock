import { configureStore } from '@reduxjs/toolkit';
import bikeReducer from '../features/products/bikeSlice';
import accessoiryReducer from '../features/products/accessorySlice';

const store = configureStore({
  reducer: {
    bikes: bikeReducer,
    accessories: accessoiryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export { store };
