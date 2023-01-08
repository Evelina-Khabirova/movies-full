import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm({
  movies,
  isLoading,
  requestFilterMovies
}) {
  const [value, setValue] = useState('');
  const searchStory = localStorage.getItem('SearchValue');
  const checkboxStory = localStorage.getItem('Checked');
  const [checkbox, setCheckbox] = useState(false);
  const {pathname} = useLocation();

  React.useEffect(() => {
    if (pathname === '/movies') {
      if (searchStory) {
        setValue(searchStory);
      }
      if (checkboxStory === 'true') {
        const checkboxButton = document.getElementById('form-checkbox');
        checkboxButton.checked = true;
        setCheckbox(true);
      }
    }
  }, [searchStory, checkboxStory]);

  function changeValue(e) {
    setValue(e.target.value);
  }

  function handleCheckbox() {
    if (checkbox === false) {
      setCheckbox(true);
    }
    else {
      setCheckbox(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (pathname === '/movies') {
      localStorage.setItem('SearchValue', value);
      localStorage.setItem('Checked', checkbox);
      requestFilterMovies(movies, value, checkbox);
    }
    else if (pathname === '/saved-movies') {
      requestFilterMovies(movies, value, checkbox);
    }
  }

  return (
    <div className='search-form'>
      <form 
      className='search-form__form'
      onSubmit={handleSubmit}
      >
        <input
          required
          type="search"
          placeholder='Фильм'
          className='search-form__search-input'
          name='search'
          value={value || ''}
          onChange={changeValue}
        />
        <button
          className='search-form__button'
          type='submit'
          disabled={isLoading}
        >Найти</button>
      </form>
      <div className='search-form__box'>
        <label className="search-form__checkbox-label">
          <input 
            type="checkbox"
            id='form-checkbox'
            name='form-checkbox'
            onClick={handleCheckbox}
          />
          <span className="search-form__checkbox"></span>
        </label>
        <p className='search-form__text'>Короткометражки</p>
      </div>
      <p className='search__notification'>Таких фильмов нет</p>
    </div>
  );
}

export default SearchForm;