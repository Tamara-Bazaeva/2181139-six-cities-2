import { AppDispatch, State, AuthDataType, OfferCardType, FavoritesType, FavArgType } from './types';
import { AxiosInstance, AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OffersTypes, ReviewsTypes, AuthorizationStatusType, ReviewFormType, ReviewType } from './types';
import { AuthorizationStatus, offerWhenRejected } from './const';
import { saveToken } from './token';
import { sortingAndOffersList, auth } from './slice';

export const fetchOffersAction = createAsyncThunk<OffersTypes, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>
(
  'loadingCards',
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(sortingAndOffersList.actions.setDataLoadingStatus(true));
      const resp = await api.get<OffersTypes | [] >('/six-cities/offers');
      if (resp.data.length === 0){
        dispatch(sortingAndOffersList.actions.setDataLoadingStatus(false));
        return [];
      }
      dispatch(sortingAndOffersList.actions.setDataLoadingStatus(false));
      return resp.data;
    } catch {
      dispatch(sortingAndOffersList.actions.setDataLoadingStatus(false));
      return [];
    }
  },

);

export const checkAuthAction = createAsyncThunk<{ status: AuthorizationStatus.Auth; data: AuthorizationStatusType } | AuthorizationStatus.NoAuth | undefined, undefined | AuthorizationStatus.NoAuth | AuthorizationStatus.Auth, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'requireAuthorization',

  async (_arg, { extra: api }) => {
    try {
      const resp = await api.get<AuthorizationStatusType>('/six-cities/login');
      if (resp.status === 200) {
        return {
          status: AuthorizationStatus.Auth,
          data: resp.data
        };
      }

    } catch {

      return AuthorizationStatus.NoAuth;
    }
  },

);

export const fetchReviewsAction = createAsyncThunk<ReviewsTypes, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>
(
  'loadingReviews',
  async (id: string, { extra: api }) => {
    try {
      const { data } = await api.get<ReviewsTypes>(`/six-cities/comments/${id}`);
      return data;
    } catch {
      return [];
    }
  },
);

export const fetchOffer = createAsyncThunk<OfferCardType, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>
(
  'getOffer',
  async (id: string, { extra: api }) => {
    try {
      const response = await api.get<OfferCardType>(`/six-cities/offers/${id}`);
      if (response.status === 404) {
        return offerWhenRejected;
      }
      return response.data;
    } catch {
      return offerWhenRejected;
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthDataType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const response = await api.post<AuthorizationStatusType>('/six-cities/login', { email, password });
      const token = response.data.token;

      saveToken(token);
      dispatch(auth.actions.requireAuthorization(AuthorizationStatus.Auth));
      dispatch(checkAuthAction(AuthorizationStatus.Auth));

    } catch {
      dispatch(auth.actions.requireAuthorization(AuthorizationStatus.NoAuth));
    }
  });

export const fetchOffersNearby = createAsyncThunk<OffersTypes, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>
(
  'getOffersNearby',
  async (id: string, { extra: api }) => {
    try {
      const response = await api.get<OffersTypes>(`/six-cities/offers/${id}/nearby`);

      return response.data;
    } catch {
      return [];
    }
  },
);

export type PostCommentParam = ReviewFormType & { id: string };

export const postComment = createAsyncThunk<ReviewType, PostCommentParam, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'postComment',

  async ({ id, rating, comment }, { extra: api }) => {
    const response = await api.post<ReviewFormType, AxiosResponse<ReviewType>>(`/six-cities/comments/${id}`, { rating, comment });
    return response.data;

  }
);

export const fetchFavorites = createAsyncThunk<FavoritesType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFavorites',

  async (_arg, {extra: api}) => {
   const response = await api.get<FavoritesType>('/six-cities/favorite');
   return response.data;
  }
);

export const setFavorite = createAsyncThunk<OfferCardType, FavArgType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'setFavorites',

  async ({id, status}, {dispatch, extra: api}) => {
   const resp = await api.post<FavArgType, AxiosResponse<OfferCardType>>(`/six-cities/favorite/${id}/${status}`);
   dispatch(fetchFavorites());
   dispatch(fetchOffersAction());
   return resp.data as OfferCardType;
  }
);
