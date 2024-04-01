import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigation = useNavigate();
  const { user } = useAuthContext();
  const isLoggedIn = user !== null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigation('/login');
    }
  }, []);
  return (
    <div>
      <NavBar />
      <div>Home Page</div>
    </div>
  );
};
