import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../const';
import AuthHeader from './auth-header';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../store/auth/auth-selectors';

function HeaderLogin(): JSX.Element {
  const authStatus = useSelector(selectAuthStatus);
  return (
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link className="header__logo-link header__logo-link--active" to="/">
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
          </Link>
        </div>
        <nav className="header__nav">
          {authStatus === AuthorizationStatus.Auth && (<AuthHeader />)}
          {authStatus !== AuthorizationStatus.Auth && (
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <div className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <Link className="header__login" to='/login'>Sign in</Link>
                </div>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
}

export default HeaderLogin;
