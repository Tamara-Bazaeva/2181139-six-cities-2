import ReviewForm from './review-form';
import { ReviewsTypes } from '../types';
import { AuthorizationStatus } from '../const';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../store/auth/auth-selectors';

type ReviewsPropType = {
  reviews: ReviewsTypes;
}

export default function ReviewList({ reviews}: ReviewsPropType): JSX.Element {
  const authStatus = useSelector(selectAuthStatus);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.slice(0, 10).map((review) => (
          <li className="reviews__item" key={review.id}>
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
              </div>
              <span className="reviews__user-name">
                {review.user.name}
              </span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{width: `${review.rating / 0.05}%`}}></span>
                  <span className="visually-hidden"></span>
                </div>
              </div>
              <p className="reviews__text">
                {review.comment}
              </p>
              <time className="reviews__time">
                {new Intl.DateTimeFormat('en-US', {
                  month: 'long',
                  year: 'numeric'
                }).format(new Date(review.date))}
              </time>
            </div>
          </li>
        ))}
      </ul>
      {authStatus === AuthorizationStatus.Auth && <ReviewForm />}
    </section>);

}


