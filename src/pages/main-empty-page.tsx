import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectCity } from '../store/offers/offers-selectors';

export default function MainEmpty(): JSX.Element {
  const cityFromState = useSelector(selectCity);
  return (
    <main className="page__main page__main--index page__main--index-empty">
      <section className="locations container">
      </section>
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property available at the moment in {cityFromState}</p>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </div>
    </main>
  );
}
