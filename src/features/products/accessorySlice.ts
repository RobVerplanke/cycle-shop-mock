import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessoiresList: [
    { id: 'a1', name: 'accessoiry one' },
    { id: 'a2', name: 'accessoiry two' },
  ],
};

const accessoirySlice = createSlice({
  name: 'accessoires',
  initialState,
  reducers: {
    addAccessoiry: (state, action) => {
      state.accessoiresList.push(action.payload);
    },
  },
});

export const { addAccessoiry } = accessoirySlice.actions;
export default accessoirySlice.reducer;
