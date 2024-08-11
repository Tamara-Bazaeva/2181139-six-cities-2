import { State } from '../../types';
import { NameSpace } from '../../const';

export const selectAuthStatus = (state: State) => state[NameSpace.Auth].status;

export const selectAuthData = (state: State) => state[NameSpace.Auth].data;
