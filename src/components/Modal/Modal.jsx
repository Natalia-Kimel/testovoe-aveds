import React, { useState } from 'react';
import { authService } from '../../services/authService';
import Button from '../ui/Button/Button';
import styles from './Modal.module.css';
import { useAuth } from '../../context/AuthContext';

const Modal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
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
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const loginValidation = authService.validateLogin(formData.login);
    if (!loginValidation.isValid) {
      newErrors.login = loginValidation.error;
    }

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
        login(result.user);
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
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Авторизация</h2>
          <button className={styles.modalClose} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {errors.submit && <div className={styles.errorMessage}>{errors.submit}</div>}

          <div className={styles.formGroup}>
            <label htmlFor="login">Логин:</label>
            <input
              type="text"
              id="login"
              name="login"
              value={formData.login}
              onChange={handleInputChange}
              className={errors.login ? `${styles.error}` : ''}
              disabled={isLoading}
            />
            {errors.login && <span className={styles.errorText}>{errors.login}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? `${styles.error}` : ''}
              disabled={isLoading}
            />
            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
          </div>

          <div className={styles.formActions}>
            <Button 
              type="submit" 
              variant="primary" 
              disabled={isLoading}
              className={styles.loginButton}
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Modal;
