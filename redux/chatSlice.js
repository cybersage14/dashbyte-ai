import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = { messages: [] };

// Slice containing the chat state and reducers
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessages: (state, action) => {
      state.messages.push(...action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    // Add the setMessages function
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { addMessages, clearMessages, setMessages } = chatSlice.actions;

export default chatSlice.reducer;
