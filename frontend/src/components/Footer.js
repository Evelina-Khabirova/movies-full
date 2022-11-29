import React from 'react';

function Footer({

}) {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__box">
        <p className="footer__text footer__text_grey">&copy;2020</p>
        <div className='footer__box-link'>
          <p className="footer__text">Яндекс.Практикум</p>
          <p className="footer__text">Github</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;