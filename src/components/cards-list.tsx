import CardListItem from './card-list-item';
import { SetFavoriteType, OffersType } from '../types';
import { useState, useCallback } from 'react';
import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { setFavoriteAction } from '../store/async-actions';
import { useAppDispatch } from '../hooks';
import { selectCityOffers } from '../store/offers/offers-selectors';

function CardsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const offersByCity = useSelector(selectCityOffers);
  const [, setActiveCard] = useState<string>('');

  const handleMouseEnter = useCallback((id: string) => {
    setActiveCard(id);
  }, []);

  const handleFavoriteClick = useCallback(
    ({id, status} : SetFavoriteType) => {
      dispatch(setFavoriteAction({id, status}));
    },
    [dispatch]
  );

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersByCity.map((offer: OffersType) =>
        (<CardListItem key={offer.id} offer={offer} onMouseEnter={handleMouseEnter} onSetFavorite={handleFavoriteClick}/>))}
    </div>);
}

export default React.memo(CardsList);

