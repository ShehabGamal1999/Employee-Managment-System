// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 

   const [authTokens, setAuthTokens] = useState(() => 
    localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null
  );
  

  const [user, setUser] = useState(() => 
    authTokens ? jwtDecode(authTokens.token) : null
  );

  const login = async (Username, Password) => {
    console.log(Username, Password);
    try {
      const response = await api.post('/auth/login', { Username, Password });
      console.log(response);
      setAuthTokens(response.data);
      // console.log("authTokens:", response.data);
      // console.log("jwtDecode:", jwtDecode(response.data.token).role);
      localStorage.setItem('tokens', JSON.stringify(response.data.token));
      setUser(() => jwtDecode(response.data.token));
      return { success: true };
      // console.log("user:", jwtDecode(response.data.token)); 
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };


  const register = async (userData) => {
    try {
      await api.post('/api/auth/register', userData);
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('tokens');
  };

  useEffect(() => {
    if (authTokens) {
      const decoded = jwtDecode(authTokens.token);
      if (decoded.exp * 1000 < Date.now()) {
        logout();
      } else {
        console.log(decoded);
        setUser(decoded);
      }
    }
  }, [authTokens]);

  const contextData = {
    user,
    authTokens,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};