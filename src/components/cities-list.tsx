import { useAppDispatch } from '../hooks';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '..';
import { NameSpace } from '../const';
import { changeCity } from '../store/offers/offers.slice';

export default function CitiesList() : JSX.Element {

  const citiesList = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
  const dispatch = useAppDispatch();
  const cityFromState = useSelector((state : RootState) => state[NameSpace.Offers].city);

  return (
    <ul className="locations__list tabs__list">
      {citiesList.map((city) => (
        <div onClick={function selectCity() {
          dispatch(changeCity(city));
        }} key={city}
        >
          <li className="locations__item" key={city}>
            <a className={`locations__item-link tabs__item ${cityFromState === city ? 'tabs__item--active' : ''} `} key={city} href="#">
              <span key={city}> {city}</span>
            </a>
          </li>
        </div>
      ))}
    </ul>);
}


