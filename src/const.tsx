import { OfferCardType } from './types';

export enum AppRoute {
  Login = '/login',
  Main = '/',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Empty = '/empty',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
}

export const offerWhenRejected: OfferCardType = {
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
};

export enum NameSpace {
  Auth = 'AUTH',
  Offers = 'OFFERS',
  Offer = 'OFFER',
  Reviews = 'REVIEWS'
}
