import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

export const PresentationCard = ({ name, description, thumbnail }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2">
          This is a basic Material-UI card.
        </Typography>
      </CardContent>
    </Card>
  );
};
