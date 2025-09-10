import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Title from '../../components/ui/Title/Title';
import Modal from '../../components/Modal/Modal';
import styles from './ContactsPage.module.css';

const ContactsPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <Header onOpenLogin={handleLogin} />
      <main className={styles.content}>
        <Title level={1}>Контакты</Title>
      </main>

      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
};

export default ContactsPage;
