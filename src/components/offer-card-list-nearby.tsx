import OfferNearby from './offer-card-nearby';
import { OffersTypes } from '../types';

type OffersListNearbyProps = {
  offersNearby: OffersTypes;
}

export default function OffersListNearby({ offersNearby }: OffersListNearbyProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offersNearby.slice(0,3).map((of) => <OfferNearby offer={of} key={of.id}/>)};
      </div>
    </section>
  );

}
