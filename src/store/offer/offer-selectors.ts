import { createSelector } from '@reduxjs/toolkit';
import { OffersType, State } from '../../types';
import { NameSpace } from '../../const';

export const selectOffer = (state: State) => state[NameSpace.Offer].offer;

export const selectNearbyOffers = (state: State) => state[NameSpace.Offer].offersNearby.slice(0,3);

const groupByCity = (offers: OffersType[]) => offers.reduce<{
  [city: string]: OffersType[];
}>((acc, offer) => {
  if (!acc[offer.city.name]) {
    acc[offer.city.name] = [];
  }
  acc[offer.city.name].push(offer);

  return acc;
}, {});

export const selectFavorites = (state: State) => state[NameSpace.Offer].favorites;

export const selectFavoritesGroupedByCity = createSelector(selectFavorites, (offers) => groupByCity(offers));

