import { OffersType , OfferCardType, FavArgType} from '../types';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { sortingAndOffersList } from '../slice';

type OneCardProps = {
  offer: OffersType;
  onMouseEnter: (id: string) => void;
  onSetFavorite: ({id, status} : FavArgType) => Promise<OfferCardType>;
}

function OneCard({ offer, onMouseEnter, onSetFavorite }: OneCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const id = offer.id;

  const mouseEnter = onMouseEnter;

  const handler = () => {
    mouseEnter(id);
  };

  const favClick = () => {
    onSetFavorite({ id, status: Number(!offer.isFavorite)});
  }

  return (
    <div onMouseEnter={function sendingId() {
      handler();
      dispatch(sortingAndOffersList.actions.changingHoveredCard(`${id}`));

    }}
    >
      <article className="cities__card place-card">
        <div className="place-card__mark">
          <span>{offer.isPremium ? 'Premium' : ''}</span>
        </div>
        <div className="cities__image-wrapper place-card__image-wrapper">
          <Link to={`/offer/${id}`}>
            <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
          </Link>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">{offer.price} euro</b>
              <span className="place-card__price-text">night</span>
            </div>
            <button className='place-card__bookmark-button button place-card__bookmark-button--active' onClick={favClick} type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: '80%' }}></span>
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
