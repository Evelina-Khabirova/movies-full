import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/logo.svg';
import accountImg from '../images/icon__COLOR_icon-account.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function HeaderMovies() {
  const [, setOpenNavTab] = React.useContext(CurrentUserContext);
  return (
    <div className='header-movies'>
      <Link to={'/'}><img src={headerLogo} alt="Логотип" className="header-movies__logo" /></Link>
      <div className='header-movies__link-box'>
        <Link to={'/movies'} className="header-movies__films">Фильмы</Link>
        <Link to={'/saved-movies'} className="header-movies__save-films">Сохранённые фильмы</Link>
        <Link to={'/profile'} className="header-movies__account-link-box">
          <img src={accountImg} alt="Иконка аккаунта" className='header-movies__account-img' />
          <p className='header-movies__account'>Аккаунт</p>
        </Link>
      </div>
      <button
        className='header-movies__burger-menu'
        type='button'
        aria-label='Меню'
        onClick={setOpenNavTab}
      ></button>
    </div>
  );
}

export default HeaderMovies;