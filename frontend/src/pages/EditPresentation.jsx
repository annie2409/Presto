import { Alert, CircularProgress, Snackbar, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SplitPane from 'split-pane-react/esm/SplitPane';
import { Pane } from 'split-pane-react';
import { PresentationControls } from '../components/PresentationControls';
import 'split-pane-react/esm/themes/default.css';
import { Slide } from '../components/Slide';
import styled from 'styled-components';
import { useUserDataContext } from '../context/UserDataContext';
import { SlideControls } from '../components/SlideControls';
import { editPresentationPageAtSlideFor } from '../utils/routes';

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
  const { presentationId, slide } = useParams();
  const navigation = useNavigate();

  const [sizes, setSizes] = useState([150, '30%', 'auto']);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);

  useEffect(() => {
    if (slide) {
      setCurrentSlideIndex(parseInt(slide));
    }
  }, [slide]);

  const { userData, isLoading, error } = useUserDataContext();

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
    navigation(
      editPresentationPageAtSlideFor(presentationId, currentSlideIndex + 1),
    );
  };

  const handlePreviousSlideAction = () => {
    navigation(
      editPresentationPageAtSlideFor(presentationId, currentSlideIndex - 1),
    );
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
