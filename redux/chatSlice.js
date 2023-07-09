import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  messages: [],
};

// Slice containing the chat state and reducers
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {

    // Add messages to the chat history
    addMessages: (state, action) => {
      console.log('Dispatching addMessages action with payload:', action.payload);
      state.messages = [...state.messages, ...action.payload];
      console.log('Updated state:', state);
    },

    // Clear the chat history
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessages, clearMessages } = chatSlice.actions;

export default chatSlice.reducer;
