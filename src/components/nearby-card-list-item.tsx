import { OffersType, SetFavoriteType } from '../types';
import { AuthorizationStatus } from '../const';

type OfferNearbyProps = {
  offer: OffersType;
  onFavoriteClick: ({id, status} : SetFavoriteType) => void;
}

export default function NearbyCardListItem({ offer, onFavoriteClick }: OfferNearbyProps): JSX.Element {
  const handleFavoriteClick = () => {
    if (status === AuthorizationStatus.NoAuth) {
      window.location.href = '/login';
      return;
    }
    onFavoriteClick({
      id: offer.id,
      status: Number(!offer.isFavorite),
    });
  };
  return (
    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value"> {offer.price} euro</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            onClick={handleFavoriteClick}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '80%' }}></span>
            <span className="visually-hidden"> Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">Wood and stone place</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );

}
