import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import Title from '../../components/ui/Title/Title';
import Button from '../../components/ui/Button/Button';
import Card from '../../components/Card/Card';
import styles from './HomePage.module.css';
import { useAuth } from '../../context/AuthContext';

const HomePage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, goToContacts } = useAuth();

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <div className="container">
      <Header onOpenLogin={handleLogin} />

      <main className={styles.content}>
        <div className={styles.contentMain}>
          <Title level={1}>Место для получения медицинской помощи</Title>
          <div className={styles.actions}>
            {!isAuthenticated && (
              <Button variant="primary" onClick={handleLogin}>
                Войти
              </Button>
            )}
            <Button onClick={goToContacts}>Контакты</Button>
          </div>
        </div>
        <div className={styles.cards}>
          <Card title="Онлайн-прием" text="Рыба текст" imgURL="/card1.svg" className="card1" />
          <Card title="Экстренный Случай" text="Рыба текст" imgURL="/card2.svg" className="card2" />
          <Card title="Лечение рака" text="Рыба текст" imgURL="/card3.svg" className="card3" />
        </div>
      </main>

      <Modal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
