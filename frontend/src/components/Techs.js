import React from 'react';

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__how-skills">7 технологий</h3>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__box">
        <li className="techs__skill">HTML</li>
        <li className="techs__skill">CSS</li>
        <li className="techs__skill">JS</li>
        <li className="techs__skill">React</li>
        <li className="techs__skill">Git</li>
        <li className="techs__skill">Express.js</li>
        <li className="techs__skill">mobgoDB</li>
      </ul>
    </section>
  );
}

export default Techs;