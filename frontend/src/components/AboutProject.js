import React from 'react';

function AboutProject({

}) {
  return(
    <section className='about-project'>
      <h2 className="about-project__title">О проекте</h2>
      <ul className="about-project__list-box">
        <li className="about-project__list">
          <h3 className="about-project__header-list">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text-list">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="about-project__list">
          <h3 className="about-project__header-list">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text-list">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="about-project__grid-box">
        <div className="about-project__backend-time">1 неделя</div>
        <div className="about-project__frontend-time">4 недели</div>
        <div className="about-project__grid-text">backend</div>
        <div className="about-project__grid-text">frontend</div>
      </div>
    </section>
  );
}

export default AboutProject;