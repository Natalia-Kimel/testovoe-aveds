import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Title from '../../components/ui/Title/Title';
import Button from '../../components/ui/Button/Button';
import { storage } from '../../utils/storage';
import './AccountPage.module.css';

const AccountPage = () => {
  const navigate = useNavigate();
  const user = storage.getUser();

  const handleLogout = () => {
    storage.logout();
    navigate('/');
  };

  const handleContacts = () => {
    alert('Переход на страницу контактов');
  };

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  return (
    <div className="account">
      <Header 
        isAuthenticated={true}
        onContacts={handleContacts}
      />
      
      <main className="account__content">
        <Title level={1}>Личный кабинет</Title>
        
        <div className="account-info">
          <div className="info-card">
            <h3>Личная информация</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Имя:</span>
                <span className="value">{user.name}</span>
              </div>
              <div className="info-item">
                <span className="label">Логин:</span>
                <span className="value">{user.login}</span>
              </div>
              <div className="info-item">
                <span className="label">Email:</span>
                <span className="value">{user.email}</span>
              </div>
              <div className="info-item">
                <span className="label">Телефон:</span>
                <span className="value">{user.phone}</span>
              </div>
              <div className="info-item">
                <span className="label">Роль:</span>
                <span className="value">{user.role}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="account-actions">
          <Button variant="primary" onClick={handleLogout}>
            Выйти из системы
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
