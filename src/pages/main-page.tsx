
import HeaderLogin from '../components/header-login.tsx';
import CitiesList from '../components/cities-list.tsx';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import MainEmpty from './main-empty-page.tsx';
import Sorting from '../components/sorting.tsx';
import Map from '../components/map.tsx';
import {CardsList} from '../components/cards-list.tsx';

import { selectCityOffers } from '../store/offers/offers-selectors.ts';
import { selectCity } from '../store/offers/offers-selectors.ts';

function MainPage(): JSX.Element {
  const city = useSelector(selectCity);
  const offers = useSelector(selectCityOffers);

  return (
    <div>
      <div className="page page--gray page--main">
        <header className="header">
          <HeaderLogin />
        </header>
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList />
            </section>
          </div>
          <div className="cities">
            {offers.length === 0 && <MainEmpty/>}
            {offers.length > 0 && (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.length} places to stay in {city}</b>
                  <Sorting/>
                  <div className="cities__places-list places__list tabs__content">
                    <CardsList/>
                  </div>
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map/>
                  </section>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>

  );
}

export default MainPage;
