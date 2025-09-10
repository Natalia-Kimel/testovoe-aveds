import React from 'react';
import Header from '../../components/Header/Header';
import Title from '../../components/ui/Title/Title';
import Button from '../../components/ui/Button/Button';
import { storage } from '../../utils/storage';
import { useAuth } from '../../context/AuthContext';
import styles from './AccountPage.module.css';

const AccountPage = () => {
  const { logout, goToContacts } = useAuth();
  const user = storage.getUser();

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.content}>
        <Title level={1}>Привет, {user.name}</Title>
        <div className={styles.actions}>
          <Button variant="primary" onClick={logout}>
            Выйти из аккаунта
          </Button>
          <Button onClick={goToContacts}>Перейти в контакты</Button>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
