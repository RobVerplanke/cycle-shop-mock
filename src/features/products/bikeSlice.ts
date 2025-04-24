import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bikesList: [
    { id: 'b1', name: 'bike one' },
    { id: 'b2', name: 'bike two' },
  ],
};

const bikeSlice = createSlice({
  name: 'bikes',
  initialState,
  reducers: {
    addBike: (state, action) => {
      state.bikesList.push(action.payload);
    },
  },
});

export const { addBike } = bikeSlice.actions;
export default bikeSlice.reducer;
