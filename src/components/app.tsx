import MainPage from './main.tsx';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { AppRoute } from '../const.tsx';
import Login from './login.tsx';
import Favorites from './favorite.tsx';
import Offer from './offer.tsx';
import NotFound from './not-found.tsx';
import PrivateRoute from './private-route.tsx';
import { useAppSelector } from '../hooks.tsx';
import { LoadingScreen } from './loading-screen.tsx';
import { NameSpace } from '../const.tsx';
import MainEmpty from './main-empty.tsx';

function App() :JSX.Element {

  const isQuestionsDataLoading = useAppSelector((state) => state[NameSpace.Offers].isOffersDataLoading);

  if(isQuestionsDataLoading){
    return (
      < LoadingScreen/>
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
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<Offer/>}
        />
        <Route
          path="*"
          element={<NotFound/>}
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

