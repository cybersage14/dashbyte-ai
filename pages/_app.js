import store from '../redux/store';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
