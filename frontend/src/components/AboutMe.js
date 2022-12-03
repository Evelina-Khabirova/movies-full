import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import photoStudent from '../images/pic__COLOR_pic.png';

function AboutMe({

}) {
  return (
    <section className='about-me'>
      <h2 className="about-me__title">Студент</h2>
      <div className='about-me__grid-box'>
        <h3 className="about-me__name">Виталий</h3>
        <p className="about-me__specialization">Фронтенд-разработчик, 30 лет</p>
        <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
        После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        <Link to={'https://github.com/Evelina-Khabirova'} className='about-me__github-link'>Github</Link>
        <img src={photoStudent} alt="Фото студента" className="about-me__photo"></img>
      </div>
    </section>
  );
}

export default AboutMe;