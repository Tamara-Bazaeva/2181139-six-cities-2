import HeaderLogin from '../components/header-login';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import FavoriteCardItem from '../components/favorite-card-item';
import { selectFavorites } from '../store/offer/offer-selectors';
import { setFavoriteAction } from '../store/async-actions';
import { useAppDispatch } from '../hooks';
import { OffersType, SetFavoriteType } from '../types';

function FavoritesPage(): JSX.Element {
  const offers = useSelector(selectFavorites);
  const dispatch = useAppDispatch();

  const handleFavoriteClick = useCallback(
    ({ id, status }: SetFavoriteType) => {
      dispatch(setFavoriteAction({ id, status }));
    },
    [dispatch]
  );

  const amsterdam = offers.some((offer: OffersType) => offer.city.name === 'Amsterdam');
  const paris = offers.some((offer: OffersType) => offer.city.name === 'Paris');
  const cologne = offers.some((offer: OffersType) => offer.city.name === 'Cologne');
  const brussels = offers.some((offer: OffersType) => offer.city.name === 'Brussels');
  const hamburg = offers.some((offer: OffersType) => offer.city.name === 'Hamburg');
  const dusseldorf = offers.some((offer: OffersType) => offer.city.name === 'Dusseldorf');

  if (offers.length === 0) {
    return (
      <div>
        <div className="page page--favorites-empty">
          <header className="header">
            <HeaderLogin />
          </header>
          <main className="page__main page__main--favorites page__main--favorites-empty">
            <div className="page__favorites-container container">
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future
                    trips.
                  </p>
                </div>
              </section>
            </div>
          </main>
          <footer className="footer">
            <a className="footer__logo-link" href="main.html">
              <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
            </a>
          </footer>
        </div>
      </div>
    );
  }
  return (
    <div>
      <HeaderLogin />
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {amsterdam && (<li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Amsterdam</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {offers
                  .filter((offer: OffersType) => offer.city.name === 'Amsterdam')
                  .map((offer: OffersType) => (
                    <FavoriteCardItem key={offer.id} offer={offer} onFavoriteClick={handleFavoriteClick} />
                  ))}
              </div>
            </li>)}
            {paris && (<li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Paris</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {offers
                  .filter((offer: OffersType) => offer.city.name === 'Paris')
                  .map((offer: OffersType) => (
                    <FavoriteCardItem key={offer.id} offer={offer} onFavoriteClick={handleFavoriteClick} />
                  ))}
              </div>
            </li>)}
            {brussels && (<li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Brussels</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {offers
                  .filter((offer: OffersType) => offer.city.name === 'Brussels')
                  .map((offer: OffersType) => (
                    <FavoriteCardItem key={offer.id} offer={offer} onFavoriteClick={handleFavoriteClick} />
                  ))}
              </div>
            </li>)}
            {cologne && (<li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Cologne</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {offers
                  .filter((offer: OffersType) => offer.city.name === 'Cologne')
                  .map((offer: OffersType) => (
                    <FavoriteCardItem key={offer.id} offer={offer} onFavoriteClick={handleFavoriteClick} />
                  ))}
              </div>
            </li>)}
            {hamburg && (<li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Hamburg</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {offers
                  .filter((offer: OffersType) => offer.city.name === 'Hamburg')
                  .map((offer: OffersType) => (
                    <FavoriteCardItem key={offer.id} offer={offer} onFavoriteClick={handleFavoriteClick} />
                  ))}
              </div>
            </li>)}
            {dusseldorf && (<li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Dusseldorf</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {offers
                  .filter((offer: OffersType) => offer.city.name === 'Dusseldorf')
                  .map((offer: OffersType) => (
                    <FavoriteCardItem key={offer.id} offer={offer} onFavoriteClick={handleFavoriteClick} />
                  ))}
              </div>
            </li>)}
          </ul>
        </section>
      </div>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
