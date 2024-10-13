import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import NotFoundPage from './not-found-page';
import { fetchOffer , fetchReviewsAction, fetchOffersNearby, setFavoriteAction} from '../store/async-actions';
import { AuthorizationStatus } from '../const';
import { useSelector } from 'react-redux';
import Map from '../components/map';
import ReviewList from '../components/review-list';
import NearbyCardList from '../components/nearby-card-list';
import HeaderLogin from '../components/header-login';
import { selectReviews } from '../store/review/review-selectors';
import { selectOffer } from '../store/offer/offer-selectors';
import { selectNearbyOffers } from '../store/offer/offer-selectors';
import { selectAuthStatus } from '../store/auth/auth-selectors';

function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchReviewsAction(id));
      dispatch(fetchOffer(`${id}`));
      dispatch(fetchOffersNearby(`${id}`));
    }
  }, [id, dispatch]);

  const reviews = useSelector(selectReviews);
  const offer = useSelector(selectOffer);
  const nearbyOffers = useSelector(selectNearbyOffers);
  const status = useSelector(selectAuthStatus);

  const handleFavoriteClick = () => {
    if (status === AuthorizationStatus.NoAuth) {
      navigate('/login');
      return;
    }
    dispatch(setFavoriteAction({ id: offer.id, status: Number(!offer.isFavorite)}));
  };

  if (!id) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <HeaderLogin/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((im) => (
                <div className="offer__image-wrapper" key={im}>
                  <img className="offer__image" key={im} src={im} alt="Photo studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__mark">
                <span>{offer.isPremium ? 'Premium' : ''}</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button
                  className={`offer__bookmark-button button button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                  onClick={handleFavoriteClick}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: '80%'}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms" >
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">euro{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((g) =>
                    (<li className="offer__inside-item" key={g}>{g}</li>))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {offer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {offer.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewList reviews={reviews}/>
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map/>
          </section>
        </section>
        <div className="container">
          <NearbyCardList offersNearby={nearbyOffers}/>
        </div>
      </main>
    </div>
  );
}
export default OfferPage;
