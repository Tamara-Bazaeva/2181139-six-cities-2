import { State } from '../../types';
import { NameSpace } from '../../const';

export const selectOffer = (state: State) => state[NameSpace.Offer].offer;

export const selectNearbyOffers = (state: State) => state[NameSpace.Offer].offersNearby;

export const selectFavorites = (state: State) => state[NameSpace.Offer].favorites;
