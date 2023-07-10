import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';  // Import getDefaultMiddleware
import { createWrapper } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import chatReducer from './chatSlice';
import selectedPartsReducer from './partSlice';

// Persisted reducer configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({  // Combine the reducers into a single reducing function
  chat: chatReducer,
  selectedParts: selectedPartsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);  // Pass the root reducer to persistReducer

// Create the Redux store
const makeStore = () => configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: getDefaultMiddleware({
    serializableCheck: false,  // Disable the serializable check
  }),
});

const store = makeStore();

store.subscribe(() => {
  console.log('State before persist:', store.getState());
});

export const wrapper = createWrapper(makeStore);
export const persistor = persistStore(store, null, () => {
  console.log('State after rehydrate:', store.getState());
  console.log('Rehydrated state:', store.getState());
});  // Create a persistor
