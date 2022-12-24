import React from 'react';
import MoviesCard from './MoviesCard.js';

function MoviesCardList ({
  movies,
  requestSaveMovie,
  requestDeleteMovie,
  isListSavedMovies,
  getRenderMoviesToDisplay,
  sliceMovie,
  checked,
  item,
  onSubmit,
  filterMovies
}) {

  function checkArray() {
    if (checked === true) {
      return item.slice(0, sliceMovie * getRenderMoviesToDisplay());
    }
    else if (onSubmit === true) {
      return filterMovies.slice(0, sliceMovie * getRenderMoviesToDisplay());
    }
    else {
      return movies.slice(0, sliceMovie * getRenderMoviesToDisplay());
    }
  }

  return (
    <ul className='movies-card'>
      {
        checkArray().map((movie, index) => (
          <MoviesCard
            requestSaveMovie={requestSaveMovie}
            isListSavedMovies={isListSavedMovies}
            requestDeleteMovie={requestDeleteMovie}
            movie={movie}
            key={index}
          />
        ))
      }
    </ul>
  );
}

export default MoviesCardList;