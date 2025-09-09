import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  variant = '', // 'primary' | 'second' | 'second-outline'
  onClick, 
  type = 'button',
  disabled = false
}) => {
  return (
    <button 
      type={type}
      className={clsx(
        styles.button,
        variant && styles[`button--${variant}`]
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
