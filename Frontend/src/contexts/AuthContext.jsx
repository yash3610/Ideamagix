import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useData } from './DataContext';
import toast from 'react-hot-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dataContext = useData();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Re-fetch user from data context to ensure it's up-to-date
      const freshUser = dataContext.getUserById(parsedUser.id);
      setUser(freshUser);
    }
  }, [dataContext]);

  const login = (email, password) => {
    const foundUser = dataContext.findUserByCredentials(email, password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      toast.success(`Welcome back, ${foundUser.name}!`);
      navigate(foundUser.role === 'admin' ? '/admin' : '/instructor');
      return true;
    }
    
    toast.error('Invalid email or password.');
    return false;
  };

  const signup = (userData) => {
    const newUser = dataContext.addInstructor(userData);
    if(newUser) {
      toast.success('Account created successfully! Please log in.');
      navigate('/login');
    } else {
      toast.error('An account with this email already exists.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const updateProfile = (updatedData) => {
    if (!user) return;
    const updatedUser = dataContext.updateInstructor(user.id, updatedData);
    if (updatedUser) {
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully!');
    } else {
      toast.error('Failed to update profile.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
