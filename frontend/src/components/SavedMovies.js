import React, {useState} from "react";
import HeaderMovies from './HeaderMovies.js';
import SearchForm from './SearchForm.js';
import MoviesCardList from './MoviesCardList.js';
import Footer from './Footer.js';
import Preloader from "./Preloader.js";
import MoreMovies from "./MoreMovies.js";

function SavedMovies({
  isLoading,
  savedMovies,
  requestSaveMovie,
  requestDeleteMovie,
  setOpenMenu,
  getRenderMoviesToDisplay,
  handleClickMoreLoad,
  sliceMovie,
  checked,
  item,
  handleClickCheckbox,
  setFilterMovies,
  setDisplayMovies,
  displayMovies,
  isDisabledMore
}) {
  const isListSavedMovies = true;

  return (
    <section className="saved-movies">
      <HeaderMovies
        setOpenMenu={setOpenMenu}
      />
      <>
        { isLoading ? <Preloader /> :
          <>
            <SearchForm
              movies={savedMovies}
              isLoading={isLoading}
              handleClickCheckbox={handleClickCheckbox}
              setFilterMovies={setFilterMovies}
            />
            <MoviesCardList
              movies={savedMovies}
              requestSaveMovie={requestSaveMovie}
              isListSavedMovies={isListSavedMovies}
              requestDeleteMovie={requestDeleteMovie}
              getRenderMoviesToDisplay={getRenderMoviesToDisplay}
              sliceMovie={sliceMovie}
              checked={checked}
              item={item}
              setDisplayMovies={setDisplayMovies}
            />
            <MoreMovies
              handleClickMoreLoad={handleClickMoreLoad}
              isDisabledMore={isDisabledMore}
              movies={displayMovies}
            />
            <Footer />
          </>
        }
      </>
    </section>
  );
}

export default SavedMovies;