import { createSelector } from '@reduxjs/toolkit';
import { OffersType, State } from '../../types';
import { NameSpace } from '../../const';

export const selectOffers = (state: State) => state[NameSpace.Offers].offers;

export const selectCity = (state: State) => state[NameSpace.Offers].city;

export const selectCityOffers = createSelector(selectOffers, selectCity, (offers, city: string) => offers.filter((offer: OffersType) =>
offer.city.name === city));

export const selectSortingType = (state: State) => state[NameSpace.Offers].sortingType;

export const selectRawOffers = (state: State) => state[NameSpace.Offers].rawOffers;

export const selectHoveredCard = (state: State) => state[NameSpace.Offers].hoveredCard;

export const selectIsOffersDataLoading = (state: State) => state[NameSpace.Offers].isOffersDataLoading;
