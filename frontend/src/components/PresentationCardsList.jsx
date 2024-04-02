import React, { useEffect } from 'react';
import { useUserDataContext } from '../context/UserDataContext';
import { CircularProgress, Grid } from '@mui/material';
import { PresentationCard } from './PresentationCard';

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

  return (
    <Grid container spacing={2}>
      {userData.presentations.map((presentation, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <PresentationCard name={presentation}></PresentationCard>
        </Grid>
      ))}
    </Grid>
  );
};
