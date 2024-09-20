import HeaderLogin from '../components/header-login';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import FavoriteCardItem from '../components/favorite-card-item';
import { selectFavoritesGroupedByCity } from '../store/offer/offer-selectors';
import { setFavoriteAction } from '../store/async-actions';
import { useAppDispatch } from '../hooks';
import { SetFavoriteType } from '../types';

function FavoritesPage(): JSX.Element {
  const offers = useSelector(selectFavoritesGroupedByCity);
  const dispatch = useAppDispatch();

  const handleFavoriteClick = useCallback(
    ({ id, status }: SetFavoriteType) => {
      dispatch(setFavoriteAction({ id, status }));
    },
    [dispatch]
  );

  if (Object.keys(offers).length === 0) {
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
            {Object.keys(offers).map((city) => (
              <li className="favorites__locations-items" key={city}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{city}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {offers[city].map((offer) => (
                    <FavoriteCardItem key={offer.id} offer={offer} onFavoriteClick={handleFavoriteClick}/>
                  ))}
                </div>
              </li>
            ))}
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
