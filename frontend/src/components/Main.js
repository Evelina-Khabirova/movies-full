import React from 'react';
import Promo from './Promo.js';
import AboutProject from './AboutProject.js';
import Header from './Header.js';
import Techs from './Techs.js';
import AboutMe from './AboutMe.js';
import Portfolio from './Portfolio.js';
import Footer from './Footer.js';
import Preloader from './Preloader.js';
import HeaderMovies from './HeaderMovies.js';


function Main({
  isLoading,
  loggedIn,
  setOpenMenu
}) {
  return(
    <section className='main'>
      {isLoading ? <Preloader /> : 
        <>{
          loggedIn ? <HeaderMovies setOpenMenu={setOpenMenu} /> : <Header />
          }
          <Promo />
          <AboutProject />
          <Techs />
          <AboutMe />
          <Portfolio />
          <Footer />
        </>
      }
    </section>
  );
}

export default Main;