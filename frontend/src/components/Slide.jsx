import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const PaperContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Slide = ({ slideNumber, slideContent }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: '75%',
        height: '65%',
      }}
    >
      <PaperContainer>
        <Box
          maxWidth={50}
          maxHeight={50}
          position={'absolute'}
          bottom={0}
          left={0}
        >
          <Typography fontSize={'1em'}>{slideNumber}</Typography>
        </Box>
      </PaperContainer>
    </Paper>
  );
};
