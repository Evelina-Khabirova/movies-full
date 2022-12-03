import React from 'react';
import {useLocation} from 'react-router-dom';

function MoviesCard({
  movie
}) {
  const [isSaved, setIsSaved] = React.useState(false);
  const [isListSavedMovies, setIsListSavedMovies] = React.useState(false);

  const {pathname} = useLocation();
  let likeStyle ='';
  let deleteStyle='';
  switch(pathname) {
    case '/movies': deleteStyle='movies-card__icon_hidden'; break;
    case '/saved-movies': likeStyle='movies-card__icon_hidden'; break;
  }


  function setLike() {
    setIsSaved(true);
  }

  function deleteLike() {
    setIsSaved(false);
  }

  return(
    <li className='movies-card__list'>
      <img src={movie['image']} alt='Картинка фильма' className='movies-card__img' />
      <h3 className='movies-card__title'>{movie['nameRU']}</h3>
      <button
        type='button'
        className={`movies-card__icon movies-card__icon_like ${likeStyle} ${isSaved ? 'movies-card__icon_hidden' : ''}`}
        name="button-normal-film"
        onClick={setLike}
      ></button>
      <button
        type='button'
        className={`movies-card__icon movies-card__icon_save ${likeStyle} ${!isSaved ? 'movies-card__icon_hidden' : ''}`}
        name='button-saved-film'
        onClick={deleteLike}
      ></button>
      <button
        type='button'
        className={`movies-card__icon movies-card__icon_delete ${deleteStyle} ${isListSavedMovies ? 'movies-card__icon_hidden' : ''}`}
        name="button-delete-film"
      ></button>
      <p className='movies-card__duration'>{movie['duration']}</p>
    </li>
  );
}

export default MoviesCard;
