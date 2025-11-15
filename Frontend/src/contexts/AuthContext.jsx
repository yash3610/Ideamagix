import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { apiCall } from '../config/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);
 const navigate = useNavigate();

 useEffect(() => {
   // Check if user is logged in
   const storedUser = localStorage.getItem('user');
   const token = localStorage.getItem('token');
   
   if (storedUser && token) {
     setUser(JSON.parse(storedUser));
   }
   setLoading(false);
 }, []);

 const login = async (email, password) => {
   try {
     const data = await apiCall('/auth/login', {
       method: 'POST',
       body: JSON.stringify({ email, password }),
     });
     
     setUser(data);
     localStorage.setItem('token', data.token);
     localStorage.setItem('user', JSON.stringify(data));
     toast.success(`Welcome back, ${data.name}!`);
     navigate(data.role === 'admin' ? '/admin' : '/instructor');
     return true;
   } catch (error) {
     toast.error(error.message || 'Invalid email or password');
     return false;
   }
 };

 const signup = async (userData) => {
   try {
     await apiCall('/auth/register', {
       method: 'POST',
       body: JSON.stringify(userData),
     });
     toast.success('Account created successfully! Please log in.');
     navigate('/login');
   } catch (error) {
     toast.error(error.message || 'An account with this email already exists.');
   }
 };

 const logout = () => {
   setUser(null);
   localStorage.removeItem('user');
   localStorage.removeItem('token');
   navigate('/login');
 };

 const updateProfile = async (updatedData) => {
   if (!user) return;
   
   try {
     const data = await apiCall('/users/profile', {
       method: 'PUT',
       body: JSON.stringify(updatedData),
     });
     
     setUser(data);
     localStorage.setItem('user', JSON.stringify(data));
     toast.success('Profile updated successfully!');
   } catch (error) {
     toast.error(error.message || 'Failed to update profile.');
   }
 };

 if (loading) {
   return <div>Loading...</div>;
 }

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