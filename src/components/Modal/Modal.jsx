import React, { useState } from 'react';
import { authService } from '../../services/authService';
import { storage } from '../../utils/storage';
import Button from '../ui/Button/Button';
import './Modal.module.css';

const Modal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Валидация логина
    const loginValidation = authService.validateLogin(formData.login);
    if (!loginValidation.isValid) {
      newErrors.login = loginValidation.error;
    }

    // Валидация пароля
    const passwordValidation = authService.validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const result = await authService.authenticate(formData.login, formData.password);
      
      if (result.success) {
        storage.setAuth(result.token, result.user);
        onLoginSuccess(result.user);
        onClose();
      }
    } catch (error) {
      setErrors({ submit: error.error });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Авторизация</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {errors.submit && <div className="error-message">{errors.submit}</div>}

          <div className="form-group">
            <label htmlFor="login">Логин:</label>
            <input
              type="text"
              id="login"
              name="login"
              value={formData.login}
              onChange={handleInputChange}
              className={errors.login ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.login && <span className="error-text">{errors.login}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-actions">
            <Button 
              type="submit" 
              variant="primary" 
              disabled={isLoading}
              className="login-button"
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </Button>
          </div>
        </form>

        <div className="demo-info">
          <h4>Тестовые пользователи:</h4>
          <p>Логин: <strong>ivanov</strong> Пароль: <strong>password123</strong></p>
          <p>Логин: <strong>petrov</strong> Пароль: <strong>securepass</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Modal;