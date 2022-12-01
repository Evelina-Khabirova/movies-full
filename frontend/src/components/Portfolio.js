import React from 'react';
import arrow from '../images/text__COLOR_font-main.svg';

function Portfolio({

}) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <a href={'https://github.com/Evelina-Khabirova/how-to-learn'} className="portfolio__link-box" target='_blank'>
        <p className="portfolio__link-text">Статичный сайт</p>
        <img src={arrow} alt="Стрелка" className="portfolio__arrow" />
      </a>
      <a href={'https://github.com/Evelina-Khabirova/russian-travel'} className="portfolio__link-box" target='_blank'>
        <p className="portfolio__link-text">Адаптивный сайт</p>
        <img src={arrow} alt="Стрелка" className="portfolio__arrow" />
      </a>
      <a href={'https://github.com/Evelina-Khabirova/react-mesto-api-full'} className="portfolio__link-box" target='_blank'>
        <p className="portfolio__link-text">Одностраничное приложение</p>
        <img src={arrow} alt="Стрелка" className="portfolio__arrow" />
      </a>
    </section>
  );
}

export default Portfolio;