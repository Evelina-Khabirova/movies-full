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
  setDisplayMovies,
  displayMovies,
  isDisabledMore,
  arrSavedLikes,
  setArrSavedLikes,
  requestFilterMovies,
  filterSavedMovies,
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
              requestFilterMovies={requestFilterMovies}
            />
            <MoviesCardList
              movies={savedMovies}
              requestSaveMovie={requestSaveMovie}
              isListSavedMovies={isListSavedMovies}
              requestDeleteMovie={requestDeleteMovie}
              getRenderMoviesToDisplay={getRenderMoviesToDisplay}
              setDisplayMovies={setDisplayMovies}
              arrSavedLikes={arrSavedLikes}
              setArrSavedLikes={setArrSavedLikes}
              filterSavedMovies={filterSavedMovies}
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