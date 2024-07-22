import FormForReview from './review-form';
import { ReviewsTypes } from '../types';
import Review from './review';
import { AuthorizationStatus } from '../const';
import { NameSpace } from '../const';
import { useSelector } from 'react-redux';
import { State } from '../types';

type ReviewsPropType = {
  reviews: ReviewsTypes;
}

export default function ReviewCard({ reviews}: ReviewsPropType): JSX.Element {
  const authStatus = useSelector((state: State) => state[NameSpace.Auth].status);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <li className="reviews__item" key={review.id}>
            <div>
              <Review review={review} />
            </div>
          </li>
        ))}
      </ul>
      {authStatus === AuthorizationStatus.Auth ? (<FormForReview />) : ''}
    </section>);

}


