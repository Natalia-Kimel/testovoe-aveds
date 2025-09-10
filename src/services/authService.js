import usersData from '../users.json';

export const authService = {
  authenticate: (login, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = usersData.users.find(
          user => user.login === login && user.password === password
        );
        
        if (user) {
          resolve({
            success: true,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              login: user.login,
              phone: user.phone,
            },
            token: `token-${user.id}-${Date.now()}`
          });
        } else {
          reject({
            success: false,
            error: 'Неверный логин или пароль'
          });
        }
      }, 500);
    });
  },

  validatePassword: (password) => {
    if (password.length < 8) {
      return {
        isValid: false,
        error: 'Пароль должен содержать минимум 8 символов'
      };
    }
    return { isValid: true };
  },

  validateLogin: (login) => {
    if (login.length < 3) {
      return {
        isValid: false,
        error: 'Логин должен содержать минимум 3 символа'
      };
    }
    return { isValid: true };
  }
};
