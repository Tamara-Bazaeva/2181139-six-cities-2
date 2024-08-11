import { Link } from 'react-router-dom';

export default function NoAuthHeader(): JSX.Element {

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <div className="header__nav-link header__nav-link--profile">
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <Link className="header__login" to='/login'>Sign in</Link>
        </div>
      </li>
    </ul>
  );
}
