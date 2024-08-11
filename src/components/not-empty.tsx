import Sorting from './sorting.tsx';
import CardsList from './card-list.tsx';
import Map from './map.tsx';
import { useSelector } from 'react-redux';
import { OffersType, State } from '../types.tsx';
import { NameSpace } from '../const.tsx';

function NotEmpty(): JSX.Element {
  const city = useSelector((state: State) => state[NameSpace.Offers].city);
  const allOffers = useSelector((state: State) => state[NameSpace.Offers].offers);
  const offersByCity = allOffers.filter((of: OffersType) => of.city.name === city);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offersByCity.length} places to stay in {city}</b>
        <Sorting />
        <div className="cities__places-list places__list tabs__content">
          <CardsList />
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map />
        </section>
      </div>
    </div>
  );
}

export default NotEmpty;
