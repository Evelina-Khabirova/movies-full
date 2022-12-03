import React from "react";
import HeaderMovies from './HeaderMovies.js';
import SearchForm from './SearchForm.js';
import MoviesCardList from './MoviesCardList.js';
import Footer from './Footer.js';

function SavedMovies() {
  return (
    <section className="saved-movies">
      <HeaderMovies />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </section>
  );
}

export default SavedMovies;