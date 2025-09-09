import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import Title from '../../components/ui/Title/Title';
import Button from '../../components/ui/Button/Button';
import Card from '../../components/Card/Card';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = false;

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = (user) => {
    navigate('/account');
  };

  return (
    <div className="container">
      <Header 
        isAuthenticated={isAuthenticated}
      />
      
      <main className={styles.content}>
        <div className={styles.contentMain}>
          <Title level={1}>Место для получения медицинской помощи</Title>
          
          <div className={styles.actions}>
            {!isAuthenticated && (
              <Button 
                variant="primary" 
                onClick={handleLoginClick}
              >
                Войти
              </Button>
            )}
            
            <Button>
                Контакты
            </Button>
          </div>
        </div>

        <div className={styles.cards}>
          <Card title={"Онлайн-прием"} text={"Рыба текст"} imgURL={"/card1.svg"} />
          <Card title={"Экстренный Случай"} text={"Рыба текст"} imgURL={"/card2.svg"} />
          <Card title={"Лечение рака"} text={"Рыба текст"} imgURL={"/card3.svg"} />
        </div>
      </main>

      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default HomePage;
