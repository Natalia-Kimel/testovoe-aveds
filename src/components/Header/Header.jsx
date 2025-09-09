import React from 'react';
import Button from '../ui/Button/Button';
import Logo from '../ui/Logo/Logo';
import styles from './Header.module.css';

const Header = ({ isAuthenticated, onLogin, onLogout, onContacts }) => {
  return (
    <div className={styles.header}>
      <Logo />
      <nav className={styles.header__nav}>
        <Button variant="second" onClick={onContacts}>
          Контакты
        </Button>
        <Button variant="second-outline" onClick={isAuthenticated ? onLogout : onLogin}>
          {isAuthenticated ? 'Выйти' : 'Войти'}
        </Button>
      </nav>
    </div>
  );
};

export default Header;
