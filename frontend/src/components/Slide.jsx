import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const PaperContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Slide = ({ slideNumber, slideData }) => {
  console.log(slideData);
  return (
    <Paper
      elevation={3}
      sx={{
        width: '75%',
        height: '65%',
      }}
    >
      <PaperContainer>
        {slideData.elements.map((ele, index) => {
          return (
            <Box
              key={index}
              width={`${ele.width}%`}
              height={`${ele.height}%`}
              overflow={'hidden'}
              textOverflow={'clip'}
              border={'0.75px solid #ddd'}
            >
              <Typography
                key={index}
                fontSize={ele.fontSize}
                color={ele.fontColor}
                textOverflow={'clip'}
                width={`${ele.width}%`}
                height={`${ele.height}%`}
              >
                {ele.text}
              </Typography>
            </Box>
          );
        })}
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
