import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessages: (state, action) => {
      console.log('Dispatching addMessages action with payload:', action.payload);
      state.messages = [...state.messages, ...action.payload];
      console.log('Updated state:', state);
    },
  },
});

export const { addMessages } = chatSlice.actions;

export default chatSlice.reducer;
