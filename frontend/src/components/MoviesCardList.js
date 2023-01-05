import React, {useEffect, useState} from 'react';
import MoviesCard from './MoviesCard.js';

function MoviesCardList ({
  movies,
  isListSavedMovies,
  requestSaveMovie,
  requestDeleteMovie,
  getRenderMoviesToDisplay,
  sliceMovie,
  checked,
  item,
  likes,
  setLikes,
  arrSavedLikes,
  setDisplayMovies
}) {
  const searchStory = localStorage.getItem('SearchValue');
  const [searchMovies, setSearchMovies] = useState([]);

  React.useEffect(() => {
    if (searchStory) {
      setSearchMovies(movies.filter(movie => {
        return movie.nameRU.toLowerCase().includes(searchStory.toLowerCase());
      }));
    }
  }, [searchStory]);

  React.useEffect(() => {
    if (checked) {
      setDisplayMovies(item.length);
    }
    else if (searchStory) {
      setDisplayMovies(searchMovies.length);
    }
    else {
      setDisplayMovies(movies.length);
    }
  });

  function checkArray() {
    if (checked) {
      return item.slice(0, sliceMovie * getRenderMoviesToDisplay());
    }
    else if (searchStory) {
      return searchMovies.slice(0, sliceMovie * getRenderMoviesToDisplay());
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
            requestDeleteMovie={requestDeleteMovie}
            isListSavedMovies={isListSavedMovies}
            likes={likes}
            setLikes={setLikes}
            arrSavedLikes={arrSavedLikes}
            movie={movie}
            key={index}
          />
        ))
      }
    </ul>
  );
}

export default MoviesCardList;