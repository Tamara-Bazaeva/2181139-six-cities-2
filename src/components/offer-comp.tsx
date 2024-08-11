import { OfferCardType, ReviewsTypes , OffersTypes} from '../types';
import HeaderLogin from './header-login';
import Map from './map';
import ReviewCard from './review-card';
import OffersListNearby from './offer-card-list-nearby';
import { v4 as uuidv4} from 'uuid';

type OfferCopmType = {
  oneOffer: OfferCardType;
  reviews: ReviewsTypes;
  offersNear: OffersTypes;
}

function OfferComp({oneOffer, reviews, offersNear} : OfferCopmType): JSX.Element {
  const uniqueId1 = uuidv4();
  return (
    <div>
      <HeaderLogin />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {oneOffer.images.map((im) => (
                <div className="offer__image-wrapper" key={im}>
                  <img className="offer__image" key={im} src={im} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__mark">
                <span>{oneOffer.isPremium ? 'Premium' : ''}</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {oneOffer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: '80%' }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{oneOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire" key={uniqueId1}>
                  {oneOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms" key={'4'}>
                  {oneOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults" key={'7'}>
                  {oneOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">euro{oneOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {oneOffer.goods.map((g) =>
                    (<li className="offer__inside-item" key={g}>{g}</li>))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={oneOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {oneOffer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {oneOffer.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {oneOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewCard reviews={reviews}/>
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map/>
          </section>
        </section>
        <div className="container">
          <OffersListNearby offersNearby={offersNear} />
        </div>
      </main>
    </div>
  );
}
export default OfferComp;
