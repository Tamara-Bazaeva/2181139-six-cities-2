import { State } from '../../types';
import { NameSpace } from '../../const';

export const selectReviews = (state: State) => state[NameSpace.Reviews].reviews;
