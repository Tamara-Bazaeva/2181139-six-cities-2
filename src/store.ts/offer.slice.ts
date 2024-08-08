import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchFavorites,
  fetchOffer,
  fetchOffersNearby,
  setFavorite,
} from '../async-actions';

import { FavoritesType, OfferCardType, OfferStateType, OffersTypes } from '../types';

import { offerWhenRejected } from '../const';

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
    images: [''],
    maxAdults: 0,
  },
  offersNearby: [],
  favorites: []
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
      .addCase(setFavorite.fulfilled, (state, action: PayloadAction<OfferCardType>) => {
        state.favorites = [...state.favorites,action.payload];
      });
  },
});
