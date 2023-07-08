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
      state.messages.push(action.payload);
      console.log('Updated state:', state);
    },
    
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessages, clearMessages } = chatSlice.actions;

export default chatSlice.reducer;
