import React from 'react';
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
  item,
  handleClickCheckbox,
  setFilterMovies,
  setOnSubmit,
  onSubmit,
  filterMovies
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
            setOnSubmit={setOnSubmit}
          />
          <MoviesCardList
            movies={movies}
            requestSaveMovie={requestSaveMovie}
            requestDeleteMovie={requestDeleteMovie}
            errorLoading={errorLoading}
            getRenderMoviesToDisplay={getRenderMoviesToDisplay}
            sliceMovie={sliceMovie}
            checked={checked}
            item={item}
            onSubmit={onSubmit}
            filterMovies={filterMovies}
          />
          <MoreMovies
            handleClickMoreLoad={handleClickMoreLoad}
          />
          </>
        }
      </div>
      <Footer />
    </section>
  );
}

export default Movies;