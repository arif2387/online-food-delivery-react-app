import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vegOnly: true, 
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleVegFilter: (state) => {
      state.vegOnly = !state.vegOnly;
    },
  },
});

export const { toggleVegFilter } = filtersSlice.actions;
export const selectVegFilter = (state) => state.filters.vegOnly;

export default filtersSlice.reducer;
