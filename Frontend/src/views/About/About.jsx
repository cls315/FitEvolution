import React from 'react';
import imgWoman from '../../images/woman-fit.jpg';
import coach from '../../images/coach.png';
import team from '../../images/team.jpg';
import rutina from '../../images/rutina.jpeg';
// import imgWoman from '../../images';
import styles from './About.module.css';
import AboutCard from '../../components/aboutCard/AboutCard';
import SearchBar from './../../components/searchbar/searchbar.component';

const About = () => {
  const data = [
    {
      subtitle: 'Nuestra',
      title: 'Misión',
      text: 'Nuestra misión es proporcionar rutinas de ejercicios personalizadas para ayudar a las personas a alcanzar sus metas fitness.',
      img: imgWoman,
      reverse: false,
    },
    {
      subtitle: 'Nuestra',
      title: 'Historia',
      text: 'Fit Revolution nació en 2023 cuando sus fundadores, motivados por su pasión por el bienestar, decidieron crear una plataforma para compartir rutinas de ejercicios efectiva.',
      img: team,
      reverse: true,
    },
    {
      subtitle: 'Nuestro',
      title: 'Equipo Fit',
      text: 'El equipo Fit Revolution cuenta con entrenadores certificados como Jorge Pérez y Maria Gómez, comprometidos con diseñar los mejores planes de entrenamiento.',
      img: coach,
      reverse: false,
    },
    {
      subtitle: 'Contamos con',
      title: 'Diferenciadores',
      text: 'Rutinas 100% personalizadas diseñadas por expertos para sacar tu máximo potencial.',
      img: rutina,
      reverse: true,
    },
  ];

  return (
    <>
      <SearchBar className={styles.navbar} />
      <div className={styles.container}>
        {data.map(({ subtitle, title, text, img, reverse }, i) => {
          return (
            <AboutCard
              key={i}
              subtitle={subtitle}
              title={title}
              text={text}
              reverse={reverse}
              img={img}
            />
          );
        })}
      </div>
    </>
  );
};

export default About;
