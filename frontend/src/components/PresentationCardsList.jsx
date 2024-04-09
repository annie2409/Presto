import React from 'react';
import { useUserDataContext } from '../context/UserDataContext';
import { CircularProgress, Grid } from '@mui/material';
import { PresentationCard } from './PresentationCard';
import { Presentation } from '../data/presentation';

export const PresentationCardsList = () => {
  const { userData, isLoading } = useUserDataContext();

  if (isLoading) {
    return <CircularProgress data-testid="loading-spinner"></CircularProgress>;
  }

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
            data-testid={'presentation-card'}
            presentation={Presentation.fromData(presentation)}
          ></PresentationCard>
        </Grid>
      ))}
    </Grid>
  );
};
