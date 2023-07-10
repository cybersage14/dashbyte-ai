import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import chatReducer from './chatSlice';
import selectedPartsReducer from './partSlice';

// Create the Redux store
const makeStore = () => configureStore({
  reducer: {
    // Add the chat reducer to the store on the `chat` key
    chat: chatReducer,
    // Add the selected parts reducer to the store on the `selectedParts` key
    selectedParts: selectedPartsReducer,
  },
  devTools: true,
});

// Create the Redux wrapper with the store
export const wrapper = createWrapper(makeStore);
