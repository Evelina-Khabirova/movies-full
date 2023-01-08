import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {HOUR} from '../utils/utils.js';

function MoviesCard({
  movie,
  requestSaveMovie,
  requestDeleteMovie,
  isListSavedMovies,
  arrSavedLikes,
  setArrSavedLikes
}) {
  const [isSaved, setIsSaved] = React.useState(false);
  const duration = `${Math.trunc(movie.duration / HOUR)}ч ${movie.duration % HOUR}мин`;
  const {pathname} = useLocation();

  function handleSavedMovie(e) {
    if(e.target === e.currentTarget) {
      e.preventDefault();
      requestSaveMovie(movie);
      let id;
      switch(pathname) {
        case '/movies': id = movie.id; break;
        case '/saved-movies': id = movie.movieId; break;
      }
      setArrSavedLikes([id, ...arrSavedLikes]);
      setIsSaved(true);
    }
  }
  
  function handleImageUrlMovie() {
    if (typeof(movie.image) !== 'string') {
      return `https://api.nomoreparties.co${movie.image.url}`;
    }
    return movie.image;
  }

  function handleDeleteMovie(e) {
    if(e.target === e.currentTarget) {
      e.preventDefault();
      requestDeleteMovie(movie);
      let id;
      switch(pathname) {
        case '/movies': id = movie.id; break;
        case '/saved-movies': id = movie.movieId; break;
      }
      const arr = arrSavedLikes.filter(elem => elem !== id);
      setArrSavedLikes(arr);
      setIsSaved(false);
    }
  }

  let likeStyle ='';
  let deleteStyle='';
  switch(pathname) {
    case '/movies': deleteStyle='movies-card__icon_hidden'; break;
    case '/saved-movies': likeStyle='movies-card__icon_hidden'; break;
  }

  React.useEffect(() => {
    if(pathname === '/movies') {
      arrSavedLikes.forEach(elem => {
        if (elem === movie.id) {
          setIsSaved(true);
        }
      });
    }
  }, []);

  return(
    <li className='movies-card__list'>
      <a href={movie.trailerLink} target='_blank'>
      <img src={handleImageUrlMovie()} alt='Картинка фильма' className='movies-card__img' />
      </a>
      <h3 className='movies-card__title'>{movie['nameRU']}</h3>
      <button
        type='button'
        className={`movies-card__icon movies-card__icon_like ${likeStyle} ${isSaved ? 'movies-card__icon_hidden' : ''}`}
        name="button-normal-film"
        onClick={handleSavedMovie}
      ></button>
      <button
        type='button'
        className={`movies-card__icon movies-card__icon_save ${likeStyle} ${!isSaved ? 'movies-card__icon_hidden' : ''}`}
        name='button-saved-film'
        onClick={handleDeleteMovie}
      ></button>
      <button
        type='button'
        className={`movies-card__icon movies-card__icon_delete ${deleteStyle} ${!isListSavedMovies ? 'movies-card__icon_hidden' : ''}`}
        name="button-delete-film"
        onClick={handleDeleteMovie}
      ></button>
      <p className='movies-card__duration'>{duration}</p>
    </li>
  );
}

export default MoviesCard;
