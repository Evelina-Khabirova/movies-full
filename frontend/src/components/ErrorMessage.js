import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function ErrorMessage() {
  return (
    <section className='error-message'>
      <h2 className='error-message__title'>404</h2>
      <p className='error-message__text'>Страница не найдена</p>
      <Link to={'/'} className='error-message__link'>Назад</Link>
    </section>
  );
}

export default ErrorMessage;