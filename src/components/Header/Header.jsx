import React from 'react';
import Button from '../ui/Button/Button';
import Logo from '../ui/Logo/Logo';
import styles from './Header.module.css';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onOpenLogin }) => {
  const { isAuthenticated, logout, goToContacts, goHome } = useAuth();

  return (
    <div className={styles.content}>
      <div onClick={goHome}>
        <Logo />
      </div>
      <nav className={styles.actions}>
        <Button variant="second" onClick={goToContacts}>
          Контакты
        </Button>
        {isAuthenticated ? (
          <Button variant="second-outline" onClick={logout}>
            Выйти
          </Button>
        ) : (
          <Button variant="second-outline" onClick={onOpenLogin}>
            Войти
          </Button>
        )}
      </nav>
    </div>
  );
};

export default Header;
