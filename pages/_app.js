import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';  // Import PersistGate
import { wrapper, persistor } from '../redux/store';  // Import persistor
import '../styles/globals.css';

// This component is the main app component.
function MyApp({ Component, ...rest }) {
  // Use the Redux store provided by the wrapper
  const { store, props } = wrapper.useWrappedStore(rest);
  
  // Pass the Redux store to the app
  const { pageProps } = props;

  // Render the app
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
