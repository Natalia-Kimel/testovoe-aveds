import React from 'react';
import styles from'./Title.module.css';

const Title = ({ 
  children, 
  level = 1,
}) => {
  
  return (
    <div className={`${styles.title} ${styles[`title--h${level}`]}`}>
      {children}
    </div>
  );
};

export default Title;
