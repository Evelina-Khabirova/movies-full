import React from 'react';
import heroImg from '../images/text__COLOR_landing-logo.svg';

function Promo({

}) {
  return (
    <section className='promo'>
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img src={heroImg} alt="OC" className="promo__img" />
    </section>
  );
}

export default Promo;