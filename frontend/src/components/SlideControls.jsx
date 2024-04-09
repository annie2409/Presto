import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const BottomRightButtonsContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000; /* Ensure buttons are on top of other content */
`;

export const SlideControls = ({
  handlePreviousSlideAction,
  handleNextSlideAction,
  showLeftArrow,
  showRightArrow,
}) => {
  return (
    <BottomRightButtonsContainer>
      {showLeftArrow && (
        <Tooltip title="Previous slide">
          <IconButton
            aria-label="Previous slide"
            onClick={handlePreviousSlideAction}
            data-testid="previous-button"
          >
            <KeyboardArrowLeftRounded />
          </IconButton>
        </Tooltip>
      )}
      {showRightArrow && (
        <Tooltip title="Next slide">
          <IconButton
            aria-label="Next slide"
            onClick={handleNextSlideAction}
            data-testid="next-button"
          >
            <KeyboardArrowRightRounded />
          </IconButton>
        </Tooltip>
      )}
    </BottomRightButtonsContainer>
  );
};
