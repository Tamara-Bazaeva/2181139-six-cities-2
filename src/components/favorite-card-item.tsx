import { Link } from 'react-router-dom';
import { OffersType, SetFavoriteType } from '../types';

type FavoriteCardProps = {
  offer: OffersType;
  onFavoriteClick: ({ id, status }: SetFavoriteType) => void;
}

function FavoriteCardItem({offer, onFavoriteClick} : FavoriteCardProps): JSX.Element {

  const handleFavoriteClick = () => {
    onFavoriteClick({
      id: offer.id,
      status: Number(!offer.isFavorite),
    });
  };

  return (
    <article className="favorites__card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>)}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image" />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{offer.price} euro</b>
            <span className="place-card__price-text"> / night</span>
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
            <span style={{width: `${offer.rating / 0.05}%`}}></span>
            <span className="visually-hidden">Rating{offer.rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default FavoriteCardItem;
