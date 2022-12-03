import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Login ({
  logged
}) {
  const [values, setValues] = useState({login_email: '', login_password: ''});

  function handleChange(e) {
    const target = e.target;
    setValues((prev) => ({
      ...prev,
      [target.name] : target.value
    }));
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
        />
        <p className='login__text'>Пароль</p>
        <input
          required
          name='login_password'
          type='password'
          placeholder='Пароль'
          className='login__input login__input_type_password'
          value={values.login_password || ''}
          onChange={handleChange}
        />
        <button
          className='login__button'
          type='submit'
          name='login__save'
        >Войти</button>
      </form>
      <p className='login__text login__text-registration'>Ещё не зарегистрированы? <Link to={'/signup'} className='login__link'>Регистрация</Link></p>
    </section>
  );
}

export default Login;