import React from 'react';
import Title from '../ui/Title/Title';
import styles from './Card.module.css';

const Card = ({ title, text, imgURL, className = '' }) => {
  return (
    <div className={`${styles.card} ${styles[`${className}`]}`}>
      <img src={imgURL} alt='Картинка карточки' className={styles.cardImg} />
      <Title level={2}>{title}</Title>
      <div className={styles.divider}></div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Card;
