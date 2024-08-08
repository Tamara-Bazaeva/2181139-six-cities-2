import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import NotFound from '../not-found';
import OfferComp from './offer-comp';
import { fetchOffer , fetchReviewsAction, fetchOffersNearby} from '../../async-actions';
import { NameSpace } from '../../const';
import { useSelector } from 'react-redux';
import { State } from '../../types';

function Offer(): JSX.Element {

  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchReviewsAction(id));
      dispatch(fetchOffer(`${id}`));
      dispatch(fetchOffersNearby(`${id}`));
    }
  }, [id, dispatch]);

  const allReviews = useSelector((state: State) => state[NameSpace.Reviews].reviews);
  const offerCard = useSelector((state: State) => state[NameSpace.Offer].offer);
  const offersNearBy = useSelector((state: State) => state[NameSpace.Offer].offersNearby);

  return (
    <div>
      { id !== '' ? (<OfferComp oneOffer = { offerCard} reviews = { allReviews } offersNear = { offersNearBy } />) : (<NotFound/>)};
    </div>
  );
}
export default Offer;
