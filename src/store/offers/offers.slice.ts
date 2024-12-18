import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { sortings, SortingType } from '../../utils';

import { fetchOffersAction, setFavoriteAction } from '../async-actions';

import { OffersTypes, OfferCardType } from '../../types';

type OffersState = {
  city: string;
  sortingType: SortingType;
  rawOffers: OffersTypes;
  offers: OffersTypes;
  hoveredCard: string;
  isOffersDataLoading: boolean;
};

const initialState: OffersState = {
  sortingType: SortingType.Popular,
  city: 'Paris',
  rawOffers: [],
  offers: [],
  hoveredCard: '0',
  isOffersDataLoading: true,
};

export const offersSlice = createSlice({
  name: 'offersSlice',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    changeSortingType: (state, action: PayloadAction<SortingType>) => {
      state.sortingType = action.payload;
      state.offers = sortings[action.payload](state.rawOffers);
    },
    setHoveredCardId: (state, action: PayloadAction<string>) => {
      state.hoveredCard = action.payload;
    },
    setDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action: PayloadAction<OffersTypes | []>) => {
        state.rawOffers = action.payload;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.rawOffers = [];
        state.offers = [];
      })
      .addCase(setFavoriteAction.fulfilled, (state, action: PayloadAction<OfferCardType>) => {
        state.rawOffers = state.rawOffers.map((offer) => offer.id === action.payload.id ? action.payload : offer);
        state.offers = state.offers.map((offer) => offer.id === action.payload.id ? action.payload : offer);
      });
  }
});

export const { changeSortingType, changeCity, setHoveredCardId } = offersSlice.actions;
