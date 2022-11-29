import React from 'react';

function SearchForm({

}) {
  return (
    <div className='search-form'>
      <form className='search-form__form'>
        <input 
          type="search"
          placeholder='Фильм'
          className='search-form__search-input'
        />
        <button
          className='search-form__button'
        >Найти</button>
      </form>
      <div className='search-form__box'>
        <label className="search-form__checkbox-label">
          <input 
            type="checkbox" 
          />
          <span className="search-form__checkbox"></span>
        </label>
        <p className='search-form__text'>Короткометражки</p>
      </div>
    </div>
  );
}

export default SearchForm;