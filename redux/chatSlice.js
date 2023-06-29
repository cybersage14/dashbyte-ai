import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    addMessages: (state, action) => {
      state.messages.push(...action.payload);
    },
  },
});

export const { addMessage, addMessages } = chatSlice.actions;

export default chatSlice.reducer;
