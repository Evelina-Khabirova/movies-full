import React, {useState} from 'react';
import HeaderMovies from './HeaderMovies.js';
import SearchForm from './SearchForm.js';
import MoviesCardList from './MoviesCardList.js';
import MoreMovies from './MoreMovies.js';
import Footer from './Footer.js';
import Preloader from './Preloader.js';


function Movies({
  isLoading,
  errorLoading,
  handleClickMoreLoad,
  requestSaveMovie,
  requestDeleteMovie,
  setOpenMenu,
  movies,
  getRenderMoviesToDisplay,
  arrSavedLikes,
  setDisplayMovies,
  displayMovies,
  isDisabledMore,
  setArrSavedLikes,
  requestFilterMovies,
  filterMovies,
}) {
  return(
    <section className='movies'>
      <HeaderMovies
        setOpenMenu={setOpenMenu}
      />
      <div>
        {isLoading ? <Preloader /> : <>
          <SearchForm
            movies={movies}
            isLoading={isLoading}
            requestFilterMovies={requestFilterMovies}
          />
          <MoviesCardList
            movies={movies}
            requestSaveMovie={requestSaveMovie}
            requestDeleteMovie={requestDeleteMovie}
            errorLoading={errorLoading}
            getRenderMoviesToDisplay={getRenderMoviesToDisplay}
            arrSavedLikes={arrSavedLikes}
            setDisplayMovies={setDisplayMovies}
            setArrSavedLikes={setArrSavedLikes}
            filterMovies={filterMovies}
          />
          <MoreMovies
            handleClickMoreLoad={handleClickMoreLoad}
            isDisabledMore={isDisabledMore}
            movies={displayMovies}
          />
          </>
        }
      </div>
      <Footer />
    </section>
  );
}

export default Movies;