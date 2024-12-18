import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { Provider } from 'react-redux';
import { fetchOffersAction, checkAuthAction, fetchFavorites } from './store/async-actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store';
import { getToken } from './token';

store.dispatch(fetchOffersAction());
const token = getToken();

if (token) {
  store.dispatch(fetchFavorites());
  store.dispatch(checkAuthAction());
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App/>
    </Provider>
  </React.StrictMode>
);

