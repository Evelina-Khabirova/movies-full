import React, {useState} from 'react';

function SearchForm({
  movies,
  isLoading,
  handleClickCheckbox,
  setFilterMovies,
  setOnSubmit
}) {
  const [value, setValue] = useState('');

  function handleCheck() {
    handleClickCheckbox(movies);
  }

  function changeValue(e) {
    setValue(e.target.value);
  }

  const searchMovies = movies.filter(movie => {
    return movie.nameRU.toLowerCase().includes(value.toLowerCase());
  });

  function handleSubmit(e) {
    e.preventDefault();
    setFilterMovies(searchMovies);
    setOnSubmit(true);
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
            onClick={handleCheck}
          />
          <span className="search-form__checkbox"></span>
        </label>
        <p className='search-form__text'>Короткометражки</p>
      </div>
    </div>
  );
}

export default SearchForm;