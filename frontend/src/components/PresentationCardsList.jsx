import React, { useEffect } from 'react';
import { useUserDataContext } from '../context/UserDataContext';
import { CircularProgress } from '@mui/material';

export const PresentationCardsList = () => {
  const { userData, isLoading } = useUserDataContext();

  useEffect(() => {
    if (!isLoading) {
      console.log(userData);
    }
  }, [userData, isLoading]);

  if (isLoading) {
    return <CircularProgress></CircularProgress>;
  }

  return <div>There are {0} cards here</div>;
};
