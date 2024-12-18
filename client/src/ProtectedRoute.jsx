import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { appState } from './App';


const ProtectedRoute = ({ children }) => {
  const { user } = useContext(appState);

  // If user is not authenticated, redirect to the login page
  if (user===null) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the child component
  return children;
};

export default ProtectedRoute;