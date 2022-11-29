import React from 'react';
import HeaderMovies from './HeaderMovies.js';
import SearchForm from './SearchForm.js';
import MoviesCardList from './MoviesCardList.js';
import MoreMovies from './MoreMovies.js';
import Footer from './Footer.js';
import Preloader from './Preloader.js';


function Movies() {
  const [isLoading, setLoading] = React.useState(false);
  return(
    <section className='movies'>
      <HeaderMovies />
      <div>
        {isLoading ? <Preloader /> : <div>
          <SearchForm />
          <MoviesCardList />
          <MoreMovies />
          </div>
        }
      </div>
      <Footer />
    </section>
  );
}

export default Movies;