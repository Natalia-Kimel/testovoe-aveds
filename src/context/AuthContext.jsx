import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(storage.isAuthenticated());

  const login = (user, token) => {
    storage.login(token, user);
    setIsAuthenticated(true);
    navigate('/account');
  };  

  const logout = () => {
    storage.logout();
    setIsAuthenticated(false);
    navigate('/');
  };

  const goToContacts = () => {
    navigate('/contacts');
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, goToContacts, goHome }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
