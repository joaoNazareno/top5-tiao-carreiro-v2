import React, { createContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const { data } = await api.post('/login', credentials);
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = async () => {
    await api.post('/logout');
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (userData) => {
    const { data } = await api.post('/register', userData);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
