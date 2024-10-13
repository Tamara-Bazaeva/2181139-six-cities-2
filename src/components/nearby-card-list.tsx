import NearbyCardListItem from './nearby-card-list-item';
import { useCallback } from 'react';
import { useAppDispatch } from '../hooks';
import { setFavoriteAction } from '../store/async-actions';
import { OffersTypes, SetFavoriteType } from '../types';

type OffersListNearbyProps = {
  offersNearby: OffersTypes;
}

export default function NearbyCardList({ offersNearby }: OffersListNearbyProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleFavoriteClick = useCallback(
    ({id, status} : SetFavoriteType) => {
      dispatch(setFavoriteAction({id, status}));
    },
    [dispatch]
  );
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offersNearby.slice(0,3).map((offerNearby) => <NearbyCardListItem offer={offerNearby} onFavoriteClick={handleFavoriteClick} key={offerNearby.id}/>)};
      </div>
    </section>
  );

}
