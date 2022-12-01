import React from 'react';
import HeaderMovies from './HeaderMovies';

function Profile ({
  signOut
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
        <button 
          className='profile__exit'
          onClick={signOut}
        >Выйти из аккаунта</button>
      </div>
    </div>
  );
}

export default Profile;