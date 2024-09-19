import { rootReducer } from './store/root-reducer';
import { StatusCodes } from 'http-status-codes';
import { store } from './store';
import { AuthorizationStatus } from './const';

export type State = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type OffersType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;

};

export type OffersTypes = OffersType[];

export type OfferCardType =
  {
    id: string;
    title: string;
    type: string;
    price: number;
    city: {
      name: string;
      location: {
        latitude: number;
        longitude: number;
        zoom: number;
      };
    };
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    description: string;
    bedrooms: number;
    goods: string[];
    host: {
      name: string;
      avatarUrl: string;
      isPro: boolean;
    };
    previewImage: string;
    images: string[];
    maxAdults: number;
  }

export type FavoritesType = OfferCardType[];

export type ReviewType = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;

};

export type ReviewsTypes = ReviewType[];

export type AuthorizationStatusType = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export type AuthDataType = {
  login: string;
  password: string;
};

export type ReviewFormType = {
  rating: number;
  comment: string;
}

export type SortingAndOffersListStateType = {
  city: string;
  sorting: string;
  offersList: OffersTypes;
  hoveredCard: string;
  isOffersDataLoading: boolean;
}

export type OfferStateType = {
  offer: OfferCardType;
  offersNearby: OffersTypes;
  favorites: FavoritesType;
}

export type SetFavoriteType = {
  id: string;
  status: number;
}

export type CheckAuthResponse = {
  status: AuthorizationStatus;
  data?: AuthorizationStatusType;
};

export type CheckAuthRequest = {
  status: AuthorizationStatus;
  data?: AuthorizationStatusType;
};

export const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};
