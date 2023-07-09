import React from 'react';
import { Provider } from 'react-redux';
import { wrapper } from '../redux/store';
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
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
