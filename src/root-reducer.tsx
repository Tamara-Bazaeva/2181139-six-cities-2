import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from './const';
import {auth} from '../src/store.ts/auth.slice';
import { offerSlice } from './store.ts/offer.slice';
import { offersSlice } from './store.ts/offers.slice';
import { reviewsSlice } from './store.ts/review.slice';

export const rootReducer = combineReducers({
  [NameSpace.Auth]: auth.reducer,
  [NameSpace.Offer]: offerSlice.reducer,
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.Reviews]: reviewsSlice.reducer,
});
