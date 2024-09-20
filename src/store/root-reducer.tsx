import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {auth} from './auth/auth.slice';
import { offerSlice } from './offer/offer.slice';
import { offersSlice } from './offers/offers.slice';
import { reviewsSlice } from './review/review.slice';

export const rootReducer = combineReducers({
  [NameSpace.Auth]: auth.reducer,
  [NameSpace.Offer]: offerSlice.reducer,
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.Reviews]: reviewsSlice.reducer,
});
