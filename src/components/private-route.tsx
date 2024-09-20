import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../store/auth/auth-selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children } = props;

  const stateAuthStatus = useSelector(selectAuthStatus);

  return (
    stateAuthStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
