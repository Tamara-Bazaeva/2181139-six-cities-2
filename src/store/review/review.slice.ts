import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  fetchReviewsAction,
  postComment,
} from '../async-actions';

import { ReviewsTypes, ReviewType } from '../../types';

type ReviewStateType = {
  reviews: ReviewsTypes;
}

const initialState: ReviewStateType = {
  reviews: [],
};

export const reviewsSlice = createSlice({
  name: 'reviewSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});
