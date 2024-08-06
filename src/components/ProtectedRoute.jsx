import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Layout from './Layout';
import { jwtDecode } from 'jwt-decode'

const ProtectedRoute = () => {
  const { user, logout } = useContext(AuthContext);

  const isTokenExpired = (token) => {
    if (!token) return true;

    try {
      const { exp } = jwtDecode(token);
      if (exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (error) {
      return true;
    }
  }

  if (user && isTokenExpired(user.access)) {
    logout();
    return <Navigate to="/login" />;
  }

  return user ? <Layout><Outlet /></Layout> : <Navigate to="/login" />;
};

export default ProtectedRoute;