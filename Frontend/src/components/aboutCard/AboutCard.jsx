import React from 'react';

import styles from './AboutCard.module.css';

const AboutCard = ({ title, subtitle, text, img, reverse }) => {
  return (
    <div className={`${styles.container} ${reverse ? styles.reverse : ''}`}>
      <div className={styles.detail}>
        <div className={styles.subtitle}>{subtitle}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
        <button className={styles.button}>Registrate</button>
      </div>
      <img
        src={img}
        alt='fit girl with crossed hands'
        className={styles.image}
      />
    </div>
  );
};

export default AboutCard;
