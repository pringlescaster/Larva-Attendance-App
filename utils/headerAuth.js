// utils/headerAuth.js

export const headerAuth = () => {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };
  