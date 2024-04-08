import { Alert, CircularProgress, Snackbar, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SplitPane from 'split-pane-react/esm/SplitPane';
import { Pane } from 'split-pane-react';
import { PresentationControls } from '../components/PresentationControls';
import 'split-pane-react/esm/themes/default.css';
import { Slide } from '../components/Slide';
import styled from 'styled-components';
import { useUserDataContext } from '../context/UserDataContext';
import { SlideControls } from '../components/SlideControls';

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
    return userData.getPresentationById(presentationId);
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

  // console.log(getPresentation());
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
                presentationId={presentationId}
                slideNumber={currentSlideIndex}
                slideData={getPresentation().getSlideByIndex(
                  currentSlideIndex - 1,
                )}
              ></Slide>
            )}

            {!hasSlides && (
              <Typography variant="subtitle2">No slides yet</Typography>
            )}
          </SlideContainer>
        </SplitPane>
      </SplitPaneContainer>
      <SlideControls
        showLeftArrow={showLeftArrow}
        showRightArrow={showRightArrow}
        handleNextSlideAction={handleNextSlideAction}
        handlePreviousSlideAction={handlePreviousSlideAction}
      />
    </div>
  );
};
