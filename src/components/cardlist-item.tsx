import { OffersType , FavArgType} from '../types';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { sortingAndOffersList } from '../slice';
import { AuthorizationStatus } from '../const';
import { useSelector } from 'react-redux';
import { State } from '../types';
import { NameSpace } from '../const';

type OneCardProps = {
  offer: OffersType;
  onMouseEnter: (id: string) => void;
  onSetFavorite: ({id, status} : FavArgType) => void;
}

function OneCard({ offer, onMouseEnter, onSetFavorite }: OneCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const status = useSelector((state: State) => state[NameSpace.Auth].status);
  const handleFavoriteClick = () => {
    if (status === AuthorizationStatus.NoAuth) {
      window.location.href = '/login';
      return;
    }
    onSetFavorite({
      id: offer.id,
      status: Number(!offer.isFavorite),
    });
  };
  const handleMouseEnter = () => {
    onMouseEnter(offer.id);
    dispatch(sortingAndOffersList.actions.changingHoveredCard(offer.id));
  };

  return (
    <div onMouseEnter={handleMouseEnter}>
      <article className="cities__card place-card">
        <div className="place-card__mark">
          <span>{offer.isPremium ? 'Premium' : ''}</span>
        </div>
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
              className={'place-card__bookmark-button button'}
              onClick={handleFavoriteClick}
              type="button"
              // ${'place-card__bookmark-button--active' ? '' : 'place-card__bookmark-button--active'}`}
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
            <a href="#">{offer.title}</a>
          </h2>
          <p className="place-card__type">{offer.type}</p>
        </div>
      </article>
    </div>);
}


export default OneCard;
