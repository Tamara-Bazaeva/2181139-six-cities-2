import OneCard from './one-card';
import { OffersType } from '../types';
import { useState, useCallback } from 'react';
import React from 'react';
import { NameSpace } from '../const';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { State } from '../types';

function CardsList(): JSX.Element {

  const [, setActiveCard] = useState<string>('');
  function handlerCallback(id: string) {
    setActiveCard(id);
  }

  const handler = useCallback((id: string) => handlerCallback(id), [setActiveCard]);

  const allOffers = useSelector((state: State) => state[NameSpace.Sorting].offersList);

  const city = useSelector((state: State) => state[NameSpace.Sorting].city);
  return (
    <div className="cities__places-list places__list tabs__content">

      {allOffers.filter((of: OffersType) => of.city.name === city).map((offer: OffersType) => <OneCard key={offer.id} offer={offer} onMouseEnter={handler}/>)}
    </div>
  );
}

export default React.memo(CardsList);
