import React, {useState} from "react";
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Register({
  register
}) {
  const [values, setValues] = useState({register_name: '', register_email: '', register_password: ''});

  function handleChange(e) {
    const target = e.target;
    setValues((prev) => ({
      ...prev,
      [target.name] : target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    register ({
      name: values.register_name,
      email: values.register_email,
      password: values.register_password
    });
  }

  return (
    <section className="register">
      <Link to={'/'} className='register__logo'><img src={headerLogo} alt='Логотип' /></Link>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <form
        className='register__form'
        onSubmit={handleSubmit}
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
        />
        <p className='register__text'>E-mail</p>
        <input
          required
          name='register_email'
          type='email'
          placeholder='Email'
          className='register__input register__input_type_email'
          value={values.register_email || ''}
          onChange={handleChange}
        />
        <p className='register__text'>Пароль</p>
        <input
          required
          name='register_password'
          type='password'
          placeholder='Пароль'
          className='register__input register__input_type_password'
          value={values.register_password || ''}
          onChange={handleChange}
        />
        <button
          className='register__button'
          type='submit'
          name='register__save'
        >Зарегистрироваться</button>
      </form>
      <p className='register__text register__text-login'>Уже зарегистрированы? <Link to={'/signin'} className='register__link'>Войти</Link></p>
    </section>
  );
}

export default Register;

/*
import React, {useState} from "react";
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Register({
  register
}) {

  const [values, setValues] = useState({register_name: '', register_email: '', register_password: ''});

  function handleChange(e) {
    const target = e.target;
    setValues((prev) => ({
      ...prev,
      [target.name] : target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    register ({
      name: values.register_name,
      email: values.register_email,
      password: values.register_password
    });
  }

  return (
    <section className="register">
      <Link to={'/'}><img src={headerLogo} alt='Логотип' className='register__logo' /></Link>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <form
        className='register__form'
        onSubmit={handleSubmit}
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
        />
        <p className='register__text'>E-mail</p>
        <input
          required
          name='register_email'
          type='email'
          placeholder='Email'
          className='register__input register__input_type_email'
          value={values.register_email || ''}
          onChange={handleChange}
        />
        <p className='register__text'>Пароль</p>
        <input
          required
          name='register_password'
          type='password'
          placeholder='Пароль'
          className='register__input register__input_type_password'
          value={values.register_password || ''}
          onChange={handleChange}
        />
        <button
          className='register__button'
          type='submit'
          name='register__save'
        >Зарегистрироваться</button>
      </form>
      <p className='register__text register__text-login'>Уже зарегистрированы? <Link to={'/signin'} className='register__link'>Войти</Link></p>
    </section>
  );
}

export default Register;
*/