import React from 'react';
import MoviesCard from './MoviesCard.js';
import movies from '../utils/movies.js';

function MoviesCardList ({

}) {
  return (
    <ul className='movies-card'>
      {
        movies.map((movie) => (
          <MoviesCard
            movie={movie}
            key={movie.id}
          />
        ))
      }
    </ul>
  );
}

export default MoviesCardList;