import { ChangeEvent, useState, FormEvent, Fragment } from 'react';
import { postComment } from '../store/async-actions';
import { useAppDispatch } from '../hooks';
import { useSelector } from 'react-redux';
import { selectOffer } from '../store/offer/offer-selectors';

const STARS_COUNT = 5;
const ratingStars = Array.from({ length: STARS_COUNT }).map((_, index) => STARS_COUNT - index);

export default function ReviewForm() {
  const dispatch = useAppDispatch();
  const offer = useSelector(selectOffer);
  const [formData, setFormData] = useState(
    {
      rating: '',
      comment: ''
    }
  );

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    evt.preventDefault();
    setFormData({ ...formData, comment: evt.target.value });
  };

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setFormData({ ...formData, rating: evt.target.value });
  };

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    dispatch(postComment({ rating: Number.parseInt(formData.rating, 10), comment: formData.comment, id: offer.id }));
  }

  return (
    <form className="reviews__form form" action="#" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingStars.map((value) => (
          <Fragment key={value}>
            <input className="form__rating-input visually-hidden" name="rating" value={value} id={`${value}-stars`}
              onChange={handleRatingChange} type="radio"
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" onChange={handleTextChange} id="comment" name="comment" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" >Submit</button>
      </div>
    </form>
  );

}
