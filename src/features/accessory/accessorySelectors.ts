import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Accessory } from '../../types/Product';

export const selectAccessoryPrices = createSelector(
  (state: RootState) => state.accessories.accessories,
  (accessories) =>
    accessories.flatMap((a: Accessory) => a.prices.map((p) => p.price))
);
