import React, { useState, useCallback } from 'react';
import HeaderMovies from './HeaderMovies';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Preloader from './Preloader.js';

function Profile ({
  isLoading,
  signOut,
  handleEditUser,
  setOpenMenu
}) {
  const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const currentUser = React.useContext(CurrentUserContext).find(x => x.name);
  const [values, setValues] = useState({profile_name: '', profile_email: ''});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const button = document.querySelector('.profile__button');

  React.useEffect(() => {
    if(currentUser) {
      setValues({
        profile_name: currentUser.name,
        profile_email: currentUser.email,
      });
    }
  }, [currentUser]);



  function handleChange(e) {
    const target = e.target;
    setValues((prev) => ({
      ...prev,
      [target.name]: target.value
    }));
    if (target.name === 'profile_email') {
      if (target.validationMessage !== '') {
        setErrors({...errors, [target.name]: target.validationMessage});
      }
      else if (!EMAIL_REGEXP.test(target.value)) {
        setErrors({...errors, [target.name]: 'Адрес электронной почты введен неверно. Введите, например, test@mail.ru'});
      }
      else {
        setErrors({...errors, [target.name]: ''});
      }
    }
    else {
      setErrors({...errors, [target.name]: target.validationMessage});
    }
    setIsValid(target.closest('form').checkValidity());
    button.classList.remove('profile__button_disabled');
    button.disabled = false;
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleEditUser({
      name: values.profile_name,
      email: values.profile_email,
    });
    button.classList.add('profile__button_disabled');
    button.disabled = true;
  }

  return(
    <div className='profile'>
      <HeaderMovies
        setOpenMenu={setOpenMenu}
      />
      <>
        {
          isLoading ? <Preloader /> :
          <div className='profile__main'>
            <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
            <p className='profile__notification'>Вы успешно изменили данные!</p>
            <form 
              className='profile__form'
              onSubmit={handleSubmit}
            >
              <input
                type='text'
                className='profile__input profile__input_type_name'
                placeholder='Имя'
                name='profile_name'
                value={values.profile_name || ''}
                onChange={handleChange}
                minLength='2'
                maxLength='30'
                required
                disabled={isLoading}
              />
              <span className='profile__error' id='profile_name_type_error'>
                {`${errors.profile_name===undefined ? '' : errors.profile_name}`}
              </span>
              <input
                type='text'
                className='profile__input profile__input_type_name'
                placeholder='E-mail'
                name='profile_email'
                value={values.profile_email || ''}
                onChange={handleChange}
                minLength='2'
                maxLength='30'
                disabled={isLoading}
              />
              <span className='profile__error' id='profile_email_type_error'>
                {`${errors.profile_email===undefined ? '' : errors.profile_email}`}
              </span>
              <button
                className='profile__button profile__button_disabled'
                type='submit'
                disabled
              >Редактировать
              </button>
            </form>
            <button 
                className='profile__exit'
                onClick={signOut}
                disabled={isLoading}
            >Выйти из аккаунта</button>
          </div>
        }
      </>
    </div>
  );
}

export default Profile;