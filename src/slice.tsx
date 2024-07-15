import { AuthStateType, AuthorizationStatusType, SortingAndOffersListStateType, OffersTypes, OfferStateType, OfferCardType, ReviewType, ReviewsTypes, FavoritesType } from './types';
import { AuthorizationStatus, offerWhenRejected } from './const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkAuthAction, fetchOffersAction, fetchOffer, fetchOffersNearby, fetchReviewsAction, postComment, fetchFavorites as fetchFavorites, setFavorite } from './async-actions';

const initialAuthState: AuthStateType = {
  status: AuthorizationStatus.NoAuth,
  data: {
    name: '',
    avatarUrl: '',
    isPro: false,
    email: '',
    token: ''
  },
};

const initialSortingState: SortingAndOffersListStateType = {
  city: 'Paris',
  sorting: 'Popular',
  offersList: [],
  hoveredCard: '0',
  isOffersDataLoading: true
};

const initialOfferStateType: OfferStateType = {
  reviews: [],
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


export const auth = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.status = action.payload;
    }
  },
  extraReducers(builder) {
    builder

      .addCase(checkAuthAction.fulfilled, (state, action: PayloadAction<{ status: AuthorizationStatus; data: AuthorizationStatusType } | AuthorizationStatus.NoAuth | undefined | AuthorizationStatus.Auth>) => {

        if (typeof action.payload === 'string' && action.payload === AuthorizationStatus.NoAuth) {
          state.status = AuthorizationStatus.NoAuth;
          return;
        }
        if (typeof action.payload === 'string' && action.payload === AuthorizationStatus.Auth) {
          state.status = AuthorizationStatus.Auth;
          return;
        }

        if (action.payload?.status && action.payload?.data) {
          state.status = action.payload.status;
          state.data = action.payload.data;
        }
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.status = AuthorizationStatus.NoAuth;
      });
  },
});

export const sortingAndOffersList = createSlice({
  name: 'sortingAndOffersList',
  initialState: initialSortingState,
  reducers: {
    changingCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    changingSortingPopular: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;
    },
    changingSortingPriceHighToLow: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;
      state.offersList = state.offersList.sort((a, b) => b.price - a.price);
    },
    changingSortingPriceLowToHigh: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;
      state.offersList = state.offersList.sort((a, b) => a.price - b.price);
    },
    changingSortingTopRatedFirst: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;
      state.offersList = state.offersList.sort((a, b) => b.rating - a.rating);
    },
    changingHoveredCard: (state, action: PayloadAction<string>) => {
      state.hoveredCard = action.payload;
    },
    setDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action: PayloadAction<OffersTypes | []>) => {
        state.offersList = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offersList = [];
      });
  }
});

export const offer = createSlice({
  name: 'offer',
  initialState: initialOfferStateType,
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
      .addCase(postComment.fulfilled, (state, action: PayloadAction<ReviewType>) => {
        state.reviews = [...state.reviews, action.payload];
      })
      .addCase(postComment.rejected, (state) => {
        state.reviews = [...state.reviews];
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action: PayloadAction<ReviewsTypes>) => {
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviews = [];
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<FavoritesType>) => {
        state.favorites = action.payload;
      })
      .addCase(setFavorite.fulfilled, (state, action: PayloadAction<OfferCardType>) => {
        state.favorites = [...state.favorites,action.payload];
      })
  },
});

