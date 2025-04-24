import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bikesList: [
    {
      id: 'b1',
      name: 'bike one',
      description: 'Description of bike one',
      price: 250,
    },
    {
      id: 'b2',
      name: 'bike two',
      description: 'Description of bike two',
      price: 300,
    },
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
