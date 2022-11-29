import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import arrow from '../images/text__COLOR_font-main.svg';

function Portfolio({

}) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <Link to={'#'} className="portfolio__link-box">
        <p className="portfolio__link-text">Статичный сайт</p>
        <img src={arrow} alt="Стрелка" className="portfolio__arrow" />
      </Link>
      <Link to={'#'} className="portfolio__link-box">
        <p className="portfolio__link-text">Адаптивный сайт</p>
        <img src={arrow} alt="Стрелка" className="portfolio__arrow" />
      </Link>
      <Link to={'#'} className="portfolio__link-box">
        <p className="portfolio__link-text">Одностраничное приложение</p>
        <img src={arrow} alt="Стрелка" className="portfolio__arrow" />
      </Link>
    </section>
  );
}

export default Portfolio;