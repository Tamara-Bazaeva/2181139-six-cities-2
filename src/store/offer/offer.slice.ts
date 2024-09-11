import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchFavorites,
  fetchOffer,
  fetchOffersNearby,
  setFavoriteAction,
} from '../async-actions';

import { FavoritesType, OfferCardType, OfferStateType, OffersTypes } from '../../types';

import { offerWhenRejected } from '../../const';

const initialState: OfferStateType = {
  offer: {
    id: '',
    title: '',
    type: '',
    price: 0,
    city: {
      name: '',
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0,
      },
    },
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
    isFavorite: false,
    isPremium: false,
    rating: 0,
    description: '',
    bedrooms: 0,
    goods: [''],
    host: {
      name: '',
      avatarUrl: '',
      isPro: false,
    },
    previewImage: '',
    images: [''],
    maxAdults: 0,
  },
  offersNearby: [],
  favorites: [],
};

export const offerSlice = createSlice({
  name: 'offerSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffer.fulfilled, (state, action: PayloadAction<OfferCardType>) => {
        state.offer = action.payload;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.offer = offerWhenRejected;
      })
      .addCase(fetchOffersNearby.fulfilled, (state, action: PayloadAction<OffersTypes>) => {
        state.offersNearby = action.payload;
      })
      .addCase(fetchOffersNearby.rejected, (state) => {
        state.offersNearby = [];
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<FavoritesType>) => {
        state.favorites = action.payload;
      })
      .addCase(setFavoriteAction.fulfilled, (state, action: PayloadAction<OfferCardType>) => {
        state.offer = action.payload;
        state.offersNearby = state.offersNearby.map((offer) => offer.id === action.payload.id ? action.payload : offer);

        if (action.payload.isFavorite) {
          state.favorites.push(action.payload);
        } else {
          state.favorites = state.favorites.filter((offer) => offer.id !== action.payload.id);
        }
      });
  },
});
