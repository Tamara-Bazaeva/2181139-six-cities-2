import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch} from '../hooks';
import { useState, ChangeEvent, FormEvent } from 'react';
import { AuthorizationStatus } from '../const';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loginAction } from '../store/async-actions';
import { selectAuthData } from '../store/auth/auth-selectors';
import { selectAuthStatus } from '../store/auth/auth-selectors';

const PASSWORD_REGEX = /(?=^.{2,}$)((?=.*\d))(?=.*[A-Za-z]).*$/;

const validatePassword = (password: string) => PASSWORD_REGEX.test(password);

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector(selectAuthStatus);
  const authData = useSelector(selectAuthData);

  const [formData, setFormData] = useState(
    {
      login: '',
      password: ''
    }
  );

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth){
      navigate('/');
    }
  },[authStatus, authData, navigate]);

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const name: string = evt.target.name;
    const value: string = evt.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!validatePassword(formData.password)) {
      toast.warn('Пароль должен состоять минимум из одной латинской буквы и цифры');
      return;
    }

    dispatch(loginAction({
      login: formData.login,
      password: formData.password,
    }));
    navigate('/');
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="email">E-mail</label>
                <input className="login__input form__input" type="email" name="login" placeholder="Email" value={formData.login} onChange={handleFieldChange} required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="password">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleFieldChange} required />
              </div>
              <button className="login__submit form__submit button" type="submit" >Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>

  );
}

export default Login;

