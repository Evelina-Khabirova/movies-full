import React from 'react';

function MoviesCard({
  movie
}) {
  const [isSaved, setIsSaved] = React.useState(true);
  const [isListSavedMovies, setIsListSavedMovies] = React.useState(false);

  return(
    <li className='movies-card__list'>
      <img src={movie['image']} alt='Картинка фильма' className='movies-card__img' />
      <h3 className='movies-card__title'>{movie['nameRU']}</h3>
      <button
        type='button'
        className={`movies-card__icon movies-card__icon_like ${!isSaved ? 'movies-card__icon_hidden' : ''}`}
        name="button-saved-film"
      ></button>
      <button
        type='button'
        className={`movies-card__icon movies-card__icon_delete ${!isListSavedMovies ? 'movies-card__icon_hidden' : ''}`}
        name="button-delete-film"
      ></button>
      <p className='movies-card__duration'>{movie['duration']}</p>
    </li>
  );
}

export default MoviesCard;

/*

*/