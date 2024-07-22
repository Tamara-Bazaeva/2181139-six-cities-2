import HeaderLogin from './header-login';
import FavCard from '../../components/fav-card';
import { State } from '../../types';
import { useSelector } from 'react-redux';
import { NameSpace } from '../../const';
import FavoritesEmpty from '../../favorites-empty';

function Favorites() : JSX.Element {
  const favoriteCards = useSelector((state: State) => state[NameSpace.Offer].favorites);
  if (favoriteCards.length === 0){
    return (
      <div>
        <FavoritesEmpty/>
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
            {favoriteCards.map((fav) => <li className="favorites__locations-items" key={fav.id}> <FavCard key={fav.id} offer={fav} /></li>)}
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

export default Favorites;
