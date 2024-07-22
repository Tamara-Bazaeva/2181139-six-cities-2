import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import AuthHeader from './auth-header';
import NoAuthHeader from './no-auth-header';
import React from 'react';
import { NameSpace } from '../../const';
import { useSelector } from 'react-redux';
import { State } from '../../types';

function HeaderLogin(): JSX.Element {
  const authStatus = useSelector((state: State) => state[NameSpace.Auth].status);
  return (
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link className="header__logo-link header__logo-link--active" to="/">
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
          </Link>
        </div>
        <nav className="header__nav">
          {authStatus === AuthorizationStatus.Auth ? (<AuthHeader />) : (<NoAuthHeader />)}
        </nav>
      </div>
    </div>
  );
}

export default React.memo(HeaderLogin);
