import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import chatReducer from './chatSlice';

const makeStore = () => configureStore({
  reducer: {
    chat: chatReducer,
  },
  devTools: true,
});

export const wrapper = createWrapper(makeStore);
