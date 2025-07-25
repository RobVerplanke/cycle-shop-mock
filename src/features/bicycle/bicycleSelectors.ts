import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Bicycle } from '../../types/Product';

// Get the prices of all bicycles
export const selectBicyclePrices = createSelector(
  (state: RootState) => state.bicycles.bicycles,
  (bicycles) => bicycles.map((b: Bicycle) => Number(b.price))
);
