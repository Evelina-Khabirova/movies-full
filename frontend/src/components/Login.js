import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/logo.svg';
import Preloader from './Preloader';

function Login ({
  logged,
  isLoading
}) {
  const [values, setValues] = useState({login_email: '', login_password: ''});
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

  function handleSubmit(e) {
    e.preventDefault();
    logged({
      email: values.login_email,
      password: values.login_password
    });
  }

  return (
    <section className='login'>
      {
        isLoading ? <Preloader /> :
        <>
          <Link to={'/'} className='login__logo'><img src={headerLogo} alt='Логотип'/></Link>
          <h2 className='login__title'>Рады видеть!</h2>
          <form
            className='login__form'
            onSubmit={handleSubmit}
            name='login'
          >
          <p className='login__text'>E-mail</p>
          <input
            required
            name='login_email'
            type='email'
            placeholder='Email'
            className='login__input login__input_type_email'
            value={values.login_email || ''}
            onChange={handleChange}
            disabled={isLoading}
            minLength='2'
            maxLength='30'
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
          <span className='login__error' id='login_email_type_error'>
            {`${errors.login_email===undefined ? '' : errors.login_email}`}
          </span>
          <p className='login__text'>Пароль</p>
          <input
            required
            name='login_password'
            type='password'
            placeholder='Пароль'
            className='login__input login__input_type_password'
            value={values.login_password || ''}
            onChange={handleChange}
            disabled={isLoading}
            minLength='2'
            maxLength='30'
          />
          <span className='login__error' id='login_password_type_error'>
            {`${errors.login_password===undefined ? '' : errors.login_password}`}
          </span>
          <button
            className='login__button'
            type='submit'
            name='login__save'
            disabled={isLoading}
          >Войти</button>
        </form>
        <p className='login__text login__text-registration'>Ещё не зарегистрированы? <Link to={'/signup'} className='login__link'>Регистрация</Link></p>
        </>
      }
    </section>
  );
}

export default Login;