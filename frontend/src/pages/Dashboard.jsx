import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginPage } from '../utils/routes';

export const Dashboard = () => {
  const navigation = useNavigate();
  const { user } = useAuthContext();
  const isLoggedIn = user !== null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigation(loginPage);
    }
  }, []);
  return (
    <div>
      <NavBar />
      <div>Home Page</div>
    </div>
  );
};
