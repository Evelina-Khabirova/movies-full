import React, {useState} from "react";
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/logo.svg';
import Preloader from "./Preloader";

function Register({
  register,
  isLoading,
}) {
  const [values, setValues] = useState({register_name: '', register_email: '', register_password: ''});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  function handleChange(e) {
    const target = e.target;
    setValues((prev) => ({
      ...prev,
      [target.name] : target.value
    }));
    setErrors({...errors, [target.name]: target.validationMessage});
    setIsValid(target.closest('form').checkValidity());
  }

  function handleRegisteration(e) {
    e.preventDefault();
    register ({
      name: values.register_name,
      email: values.register_email,
      password: values.register_password
    });
  }

  return (
    <section className="register">
      {
        isLoading ? <Preloader /> :
        <>
          <Link to={'/'} className='register__logo'><img src={headerLogo} alt='Логотип' /></Link>
          <h2 className='register__title'>Добро пожаловать!</h2>
          <form
            className='register__form'
            onSubmit={handleRegisteration}
            name='register'
          >
            <p className='register__text'>Имя</p>
            <input
              required
              name='register_name'
              type='text'
              placeholder='Имя'
              className='register__input register__input_type_name'
              value={values.register_name || ''}
              onChange={handleChange}
              disabled={isLoading}
              minLength='2'
              maxLength='30'
            />
            <span className='register__error' id='register_name_type_error'>
              {`${errors.register_name===undefined ? '' : errors.register_name}`}
            </span>
            <p className='register__text'>E-mail</p>
            <input
              required
              name='register_email'
              type='email'
              placeholder='Email'
              className='register__input register__input_type_email'
              value={values.register_email || ''}
              onChange={handleChange}
              disabled={isLoading}
              minLength='2'
              maxLength='30'
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
            <span className='register__error' id='register_email_type_error'>
              {`${errors.register_email===undefined ? '' : errors.register_email}`}
            </span>
            <p className='register__text'>Пароль</p>
            <input
              required
              name='register_password'
              type='password'
              placeholder='Пароль'
              className='register__input register__input_type_password'
              value={values.register_password || ''}
              onChange={handleChange}
              disabled={isLoading}
              minLength='2'
              maxLength='30'
            />
            <span className='register__error' id='register_password_type_error'>
              {`${errors.register_password===undefined ? '' : errors.register_password}`}
            </span>
            <button
              className='register__button'
              type='submit'
              name='register__save'
              disabled={isLoading}
            >Зарегистрироваться</button>
          </form>
          <p className='register__text register__text-login'>Уже зарегистрированы? <Link to={'/signin'} className='register__link'>Войти</Link></p>
        </>
      }
    </section>
  );
}

export default Register;

/*

 */