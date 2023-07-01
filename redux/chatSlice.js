import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessages: (state, action) => {
      console.log('Dispatching addMessages action with payload:', action.payload);
      state.messages = action.payload;
      console.log('Updated state:', state);
    },
  },
});

export const { addMessages } = chatSlice.actions;

export default chatSlice.reducer;
