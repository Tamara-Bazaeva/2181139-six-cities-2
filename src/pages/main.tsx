import CardsList from '../components/cards-list.tsx';
import { OffersTypes } from '../types.ts';
import HeaderLogin from './main/header-login.tsx';
import { useState } from 'react';
import Map from './map.tsx';
import CitiesList from '../cities-list.tsx';
import Sorting from '../sorting.tsx';

const citiesAll = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

type MainPageProps = {
  numberOfRentalOffers: number;
  offersData: OffersTypes;
}

function MainPage({ numberOfRentalOffers, offersData }: MainPageProps): JSX.Element {

  const [, setActiveCard] = useState<number>(offersData[0].id);
  const handler = (id: number) => setActiveCard(id);

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

              <CitiesList cities={citiesAll} />
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{numberOfRentalOffers} places to stay in Amsterdam</b>
                <Sorting/>
                <div className="cities__places-list places__list tabs__content">
                  <CardsList onMouseEnter={handler} />
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainPage;
