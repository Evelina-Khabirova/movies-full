import React from "react";
import { Link } from 'react-router-dom';
import accountImg from '../images/icon__COLOR_icon-account.svg';

function NavTab({
  openMenu,
  setOpenMenu
}) {

  function closeNavTab() {
    setOpenMenu(false);
  }

  function closeOverlay(e) {
    return e.target.classList.contains('navtab') && setOpenMenu(false);
  }
  return(
    <div 
      className={`navtab ${!openMenu ? 'navtab__hidden' : ''}`}
      onClick={closeOverlay}
    >
      <div className="navtab__container">
        <button
          type='button'
          className="navtab__button-close"
          name="button_close"
          onClick={closeNavTab}
        ></button>
        <ul className="navtab__ul">
          <li className="navtab__list">
            <Link
              to="/"
              className="navtab__link"
              onClick={closeNavTab}
            >Главная</Link>
          </li>
          <li className="navtab__list">
            <Link
              to="/movies"
              className="navtab__link"
              onClick={closeNavTab}
            >Фильмы</Link>
          </li>
          <li className="navtab__list">
            <Link
              to="/saved-movies"
              className="navtab__link"
              onClick={closeNavTab}
            >Сохранённые фильмы</Link>
          </li>
        </ul>
        <Link
          to="/profile"
          className="navtab__link-account"
          onClick={closeNavTab}
        >
          <img src={accountImg} alt="Иконка аккаунта" className='navtab__account-img' />
          <p className='navtab__account'>Аккаунт</p>
        </Link>
      </div>
    </div>
  )
}

export default NavTab;