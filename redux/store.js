import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import chatReducer from './chatSlice';

// Create the Redux store
const makeStore = () => configureStore({
  reducer: {
    // Add the chat reducer to the store on the `chat` key
    chat: chatReducer,
  },
  devTools: true,
});

export const wrapper = createWrapper(makeStore);
