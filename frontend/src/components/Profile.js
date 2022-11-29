import React from 'react';
import HeaderMovies from './HeaderMovies';

function Profile ({

}) {
  return(
    <div className='profile'>
      <HeaderMovies />
      <div className='profile__main'>
        <h2 className='profile__title'>Привет, Виталий!</h2>
        <form className='profile__form'>
          <input
            type='text'
            className='profile__input profile__input_type_name'
            placeholder='Имя'
          />
          <input
            type='text'
            className='profile__input profile__input_type_name'
            placeholder='E-mail'
          />
          <button
            className='profile__button'
          >Редактировать
          </button>
        </form>
        <p className='profile__exit'>Выйти из аккаунта</p>
      </div>
    </div>
  );
}

export default Profile;