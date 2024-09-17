import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store/root-reducer';
import { createApi } from './store/api';

const api = createApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
