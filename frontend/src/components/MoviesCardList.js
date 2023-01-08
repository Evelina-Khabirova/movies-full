import React, {useEffect, useState} from 'react';
import MoviesCard from './MoviesCard.js';
import { useLocation } from 'react-router-dom';

function MoviesCardList ({
  movies,
  isListSavedMovies,
  requestSaveMovie,
  requestDeleteMovie,
  getRenderMoviesToDisplay,
  arrSavedLikes,
  setDisplayMovies,
  setArrSavedLikes,
  filterMovies,
  filterSavedMovies,
}) {
  const searchStory = localStorage.getItem('SearchValue');
  const {pathname} = useLocation();

  React.useEffect(() => {
    if (pathname === '/saved-movies') {
      if (filterSavedMovies.length > 0) {
        setDisplayMovies(filterSavedMovies.length);
      }
      else {
        setDisplayMovies(movies.length);
      }
    }
    else if (pathname === '/movies') {
      if (searchStory) {
        setDisplayMovies(filterMovies.length);
      }
      else {
        setDisplayMovies(movies.length);
      }
    }
  });

  function checkArray() {
    if (pathname === '/saved-movies') {
      if (filterSavedMovies.length > 0) {
        return filterSavedMovies.slice(0, getRenderMoviesToDisplay());
      }
      else {
        return movies.slice(0, getRenderMoviesToDisplay());
      }
    }
    else if (pathname === '/movies') {
      if (searchStory) {
        return filterMovies.slice(0, getRenderMoviesToDisplay());
      }
      else {
        return movies.slice(0, getRenderMoviesToDisplay());
      }
    }
  }

  return (
    <ul className='movies-card'>
      {
        checkArray().map((movie, index) => (
          <MoviesCard
            requestSaveMovie={requestSaveMovie}
            requestDeleteMovie={requestDeleteMovie}
            isListSavedMovies={isListSavedMovies}
            arrSavedLikes={arrSavedLikes}
            setArrSavedLikes={setArrSavedLikes}
            movie={movie}
            key={index}
          />
        ))
      }
    </ul>
  );
}

export default MoviesCardList;