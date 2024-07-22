import HeaderLogin from './main/header-login.tsx';
import CitiesList from '../cities-list.tsx';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { NameSpace } from '../const';
import { State } from '../types.tsx';
import { OffersType } from '../types.tsx';
import MainEmpty from '../main-empty.tsx';
import NotEmpty from '../components/not-empty.tsx';

function MainPage(): JSX.Element {

  const allOffers = useSelector((state: State) => state[NameSpace.Sorting].offersList);
  const city = useSelector((state: State) => state[NameSpace.Sorting].city);
  const offersByCity = allOffers.filter((of: OffersType) => of.city.name === city);
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
            {offersByCity.length === 0 ? <MainEmpty/> : <NotEmpty/>}
          </div>
        </main>
      </div>
    </div>

  );
}

export default MainPage;
