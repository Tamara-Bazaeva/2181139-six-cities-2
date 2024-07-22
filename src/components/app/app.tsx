import MainPage from '../../pages/main';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { AppRoute } from '../../const';
import Login from '../../pages/login';
import Favorites from '../../pages/main/favorite';
import Offer from '../../pages/main/offer.tsx';
import NotFound from '../../pages/not-found';
import PrivateRoute from '../private-route.tsx';
import { useAppSelector } from '../../hooks.tsx';
import { LoadingScreen } from '../../loading-screen.tsx';
import { NameSpace } from '../../const';
import MainEmpty from '../../main-empty.tsx';

function App() :JSX.Element {

  const isQuestionsDataLoading = useAppSelector((state) => state[NameSpace.Sorting].isOffersDataLoading);

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

