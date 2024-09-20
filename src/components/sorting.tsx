import { useAppDispatch } from '../hooks';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SortingType } from '../utils';
import { changeSortingType } from '../store/offers/offers.slice';
import { selectSortingType } from '../store/offers/offers-selectors';

export default function Sorting(): JSX.Element {

  const dispatch = useAppDispatch();
  const currentSortingType: string = useSelector(selectSortingType);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const setPopularSortingType = () => {
    dispatch(changeSortingType(SortingType.Popular));
  };

  const setPriceLowToHighSortingType = () => {
    dispatch(changeSortingType(SortingType.PriceLowToHigh));
  };

  const setPriceHighToLowSortingType = () => {
    dispatch(changeSortingType(SortingType.PriceHighToLow));
  };

  const setTopRatedFirstSortingType = () => {
    dispatch(changeSortingType(SortingType.TopRatedFirst));
  };

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onClick={handleClick}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {currentSortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <div>
        <ul
          className={`places__options places__options--custom ${
            isOpen ? 'places__options--opened' : ''
          }`}
        >
          <li
            className={`places__option ${
              currentSortingType === SortingType.Popular ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={setPopularSortingType}
          >
          Popular
          </li>
          <li
            className={`places__option ${
              currentSortingType === SortingType.PriceLowToHigh ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={setPriceLowToHighSortingType}
          >
            {' '}
          Price: low to high
          </li>
          <li
            className={`places__option ${
              currentSortingType === SortingType.PriceHighToLow ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={setPriceHighToLowSortingType}
          >
            {' '}
          Price: high to low
          </li>
          <li
            className={`places__option ${currentSortingType === SortingType.TopRatedFirst ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={setTopRatedFirstSortingType}
          >
            {' '}
          Top rated first
          </li>
        </ul>
      </div>
    </form>
  );
}
