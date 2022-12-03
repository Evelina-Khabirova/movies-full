import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header({
}) {
  return (
    <header className='header'>
      <Link to={'/'}><img src={headerLogo} alt="Логотип" className="header__logo" /></Link>
      <div className='header__link-box'>
        <Link to={'/signup'} className="header__registration-link">Регистрация</Link>
        <Link to={'/signin'} className="header__login-link">Войти</Link>
      </div>
    </header>
  );
}

export default Header;