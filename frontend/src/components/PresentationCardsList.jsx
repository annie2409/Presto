import React, { useEffect } from 'react';
import { useUserDataContext } from '../context/UserDataContext';
import { CircularProgress, Grid } from '@mui/material';
import { PresentationCard } from './PresentationCard';
import { Presentation } from '../data/presentation';

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
  console.log(userData.presentations);
  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: 2,
      }}
    >
      {userData.presentations.map((presentation, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <PresentationCard
            presentation={Presentation.fromData(presentation)}
          ></PresentationCard>
        </Grid>
      ))}
    </Grid>
  );
};
