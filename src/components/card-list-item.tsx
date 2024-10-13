import { OffersType , SetFavoriteType} from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { AuthorizationStatus } from '../const';
import { useSelector } from 'react-redux';
import { setHoveredCardId } from '../store/offers/offers.slice';
import { selectAuthStatus } from '../store/auth/auth-selectors';

type OneCardProps = {
  offer: OffersType;
  onMouseEnter: (id: string) => void;
  onSetFavorite: ({id, status} : SetFavoriteType) => void;
}

function CardListItem({ offer, onMouseEnter, onSetFavorite }: OneCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectAuthStatus);

  const handleFavoriteClick = () => {
    if (status === AuthorizationStatus.NoAuth) {
      navigate('/login');
      return;
    }
    onSetFavorite({
      id: offer.id,
      status: Number(!offer.isFavorite),
    });
  };

  const handleMouseEnter = () => {
    onMouseEnter(offer.id);
    dispatch(setHoveredCardId(offer.id));
  };

  const handleMouseLeave = () => {
    onMouseEnter('');
    dispatch(setHoveredCardId(''));
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <article className="cities__card place-card">
        {offer.isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>)}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <Link to={`/offer/${offer.id}`}>
            <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
          </Link>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">{offer.price} euro</b>
              <span className="place-card__price-text">night</span>
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
    </div>);
}


export default CardListItem;
