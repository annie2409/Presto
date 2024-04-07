import {
  Alert,
  CircularProgress,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SplitPane from 'split-pane-react/esm/SplitPane';
import { Pane } from 'split-pane-react';
import { PresentationControls } from '../components/PresentationControls';
import 'split-pane-react/esm/themes/default.css';
import { useUserStorePolling } from '../apis/store';
import { UserData } from '../data/userData';
import { Slide } from '../components/Slide';
import styled from 'styled-components';
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from '@mui/icons-material';
import { useUserDataContext } from '../context/UserDataContext';

const SlideContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d5d7d9;
`;

const SplitPaneContainer = styled.div`
  height: 100vh;
  width: 100wh;
`;

const BottomRightButtonsContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000; /* Ensure buttons are on top of other content */
`;

export const EditPresentation = () => {
  const { presentationId } = useParams();

  const [sizes, setSizes] = useState([150, '30%', 'auto']);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);

  // const { data, isLoading, error } = useUserStorePolling();
  const { userData, isLoading, error, updateUserData } = useUserDataContext();

  // const userData =
  //   data && data.store && data.store.store
  //     ? UserData.fromData(data.store.store)
  //     : new UserData();

  const getPresentation = () => {
    return userData.presentations.find(
      (item) => item.id === parseInt(presentationId),
    );
  };

  if (
    getPresentation() &&
    getPresentation().slides &&
    currentSlideIndex > getPresentation().slides.length
  ) {
    setCurrentSlideIndex(getPresentation().slides.length);
  }

  if (
    getPresentation() &&
    getPresentation().slides &&
    getPresentation().slides.length >= 1 &&
    currentSlideIndex <= 0
  ) {
    setCurrentSlideIndex(1);
  }

  const showLeftArrow =
    getPresentation() &&
    getPresentation().slides &&
    getPresentation().slides.length >= 2 &&
    currentSlideIndex > 1;

  const showRightArrow =
    getPresentation() &&
    getPresentation().slides &&
    getPresentation().slides.length >= 2 &&
    currentSlideIndex < getPresentation().slides.length;

  const hasSlides =
    getPresentation() &&
    getPresentation().slides &&
    getPresentation().slides.length !== 0;

  const handleNextSlideAction = () => {
    setCurrentSlideIndex(currentSlideIndex + 1);
  };

  const handlePreviousSlideAction = () => {
    setCurrentSlideIndex(currentSlideIndex - 1);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'ArrowRight') {
      handleNextSlideAction();
    } else if (event.key === 'ArrowLeft') {
      handlePreviousSlideAction();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentSlideIndex]);

  console.log(getPresentation());
  if (isLoading || !getPresentation()) {
    return <CircularProgress />;
  } else if (error) {
    return (
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '90%' }}>
          {error}
        </Alert>
      </Snackbar>
    );
  }

  return (
    <div>
      <NavBar />
      <SplitPaneContainer>
        <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
          <Pane minSize={250} maxSize="37%">
            <PresentationControls
              presentation={getPresentation()}
              currentSlideIndex={currentSlideIndex}
            />
          </Pane>
          <SlideContainer>
            {hasSlides && (
              <Slide
                slideNumber={currentSlideIndex}
                slideData={getPresentation().slides[currentSlideIndex]}
              ></Slide>
            )}

            {!hasSlides && (
              <Typography variant="subtitle2">No slides yet</Typography>
            )}
          </SlideContainer>
        </SplitPane>
      </SplitPaneContainer>
      <BottomRightButtonsContainer>
        {showLeftArrow && (
          <Tooltip title="Previous slide">
            <IconButton onClick={handlePreviousSlideAction}>
              <KeyboardArrowLeftRounded />
            </IconButton>
          </Tooltip>
        )}
        {showRightArrow && (
          <Tooltip title="Next slide">
            <IconButton onClick={handleNextSlideAction}>
              <KeyboardArrowRightRounded />
            </IconButton>
          </Tooltip>
        )}
      </BottomRightButtonsContainer>
    </div>
  );
};
