import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bikes: [
    { id: 'b1', name: 'bike one' },
    { id: 'b2', name: 'bike two' },
  ],
};

const bikeSlice = createSlice({
  name: 'bikes',
  initialState,
  reducers: {
    addBike: (state, action) => {
      state.bikes.push(action.payload);
    },
  },
});

export const { addBike } = bikeSlice.actions;
export default bikeSlice.reducer;
