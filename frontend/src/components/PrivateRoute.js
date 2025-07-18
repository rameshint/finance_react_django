// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('access_token');
  // Check if the token exists in localStorage
  // If the token exists, render the children components
  // If not, redirect to the login page
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
