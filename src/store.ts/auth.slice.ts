import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatusType , CheckAuthResponse} from '../types';
import { AuthorizationStatus } from '../const';
import { checkAuthAction } from '../async-actions';

export type AuthStateType = {
  status: AuthorizationStatus;
  data: AuthorizationStatusType | undefined;
}

const initialAuthState: AuthStateType = {
  status: AuthorizationStatus.NoAuth,
  data: undefined,
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
      .addCase(checkAuthAction.fulfilled, (state, action: PayloadAction<CheckAuthResponse>) => {
        state.data = action.payload.data;
        state.status = action.payload.status;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.status = AuthorizationStatus.NoAuth;
      });
  },
});
