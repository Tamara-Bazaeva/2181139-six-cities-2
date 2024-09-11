import MainPage from '../pages/main-page.tsx';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { AppRoute } from '../const.tsx';
import Login from '../pages/login-page.tsx';
import FavoritesPage from '../pages/favorites-page.tsx';
import OfferPage from '../pages/offer-page.tsx';
import PrivateRoute from './private-route.tsx';
import { useAppSelector } from '../hooks.tsx';
import MainEmpty from '../pages/main-empty-page.tsx';
import NotFoundPage from '../pages/not-found-page.tsx';
import { selectIsOffersDataLoading } from '../store/offers/offers-selectors.ts';

function App() :JSX.Element {

  const isQuestionsDataLoading = useAppSelector(selectIsOffersDataLoading);

  if(isQuestionsDataLoading){
    return (
      <p>...Loading...</p>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage/>}
        />
        <Route
          path={AppRoute.Login}
          element={<Login/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage/>}
        />
        <Route
          path="*"
          element={<NotFoundPage/>}
        />
        <Route
          path={AppRoute.Empty}
          element = {<MainEmpty/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

