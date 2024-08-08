import { OffersType } from './types';

export enum SortingType {
  Popular = 'Popular',
  PriceLowToHigh = 'PriceLowToHigh',
  PriceHighToLow = 'PriceHighToLow',
  TopRatedFirst = 'TopRatedFirst',
}

export const sortings = {
  [SortingType.Popular]: (offers: OffersType[]) => offers,
  [SortingType.PriceLowToHigh]: (offers: OffersType[]) => offers.sort((a, b) => a.price - b.price),
  [SortingType.PriceHighToLow]: (offers: OffersType[]) => offers.sort((a, b) => b.price - a.price),
  [SortingType.TopRatedFirst]: (offers: OffersType[]) => offers.sort((a, b) => b.rating - a.rating),
};
