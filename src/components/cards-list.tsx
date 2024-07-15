import OneCard from './one-card';
import { FavArgType, OffersType } from '../types';
import { useState, useCallback } from 'react';
import React from 'react';
import { NameSpace } from '../const';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { State } from '../types';
import { setFavorite } from '../async-actions';
import { useAppDispatch } from '../hooks';

function CardsList(): JSX.Element {

  const [, setActiveCard] = useState<string>('');
  function handlerCallback(id: string) {
    setActiveCard(id);
  }

  const dispatch = useAppDispatch();
  const handler = useCallback((id: string) => handlerCallback(id), [setActiveCard]);

  const favoriteHandler = ({id, status} : FavArgType) => dispatch(setFavorite({id, status}));

  const allOffers = useSelector((state: State) => state[NameSpace.Sorting].offersList);

  const city = useSelector((state: State) => state[NameSpace.Sorting].city);

  const offersByCity = allOffers.filter((of: OffersType) => of.city.name === city);

  return (
    <div className="cities__places-list places__list tabs__content">

      {offersByCity.map((offer: OffersType) => <OneCard key={offer.id} offer={offer} onMouseEnter={handler} onSetFavorite={favoriteHandler}/>)}

    </div>
  );
}

export default React.memo(CardsList);
