import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createApi } from './store/api';
import { fetchOffersAction, checkAuthAction } from './store/async-actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { rootReducer } from './store/root-reducer';

export const api = createApi();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

type SettingsType = {
  numberOfRentalOffers: number;
}

export const Settings: SettingsType = {
  numberOfRentalOffers: 3,
};

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
