
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDeleted: false,
};

const showRemoveItem = createSlice({
  name: 'showRemoveItem',
  initialState,
  reducers: {
    removeItem: (state,action) => {
      state.isDeleted = action.payload
    },
  },
});

export const { removeItem} = showRemoveItem.actions;
export default showRemoveItem.reducer;
