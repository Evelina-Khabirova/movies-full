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
  sliceMovie,
  checked,
  setChecked,
  item,
  handleClickCheckbox,
  setFilterMovies,
  likes,
  setLikes,
  arrSavedLikes,
  setDisplayMovies,
  displayMovies,
  isDisabledMore
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
            handleClickCheckbox={handleClickCheckbox}
            setFilterMovies={setFilterMovies}
          />
          <MoviesCardList
            movies={movies}
            requestSaveMovie={requestSaveMovie}
            requestDeleteMovie={requestDeleteMovie}
            errorLoading={errorLoading}
            getRenderMoviesToDisplay={getRenderMoviesToDisplay}
            sliceMovie={sliceMovie}
            checked={checked}
            setChecked={setChecked}
            item={item}
            likes={likes}
            setLikes={setLikes}
            arrSavedLikes={arrSavedLikes}
            setDisplayMovies={setDisplayMovies}
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