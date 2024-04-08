import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserDataContext } from '../context/UserDataContext';
import { PaperContainer, Slide } from '../components/Slide';
import styled from 'styled-components';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { SlideControls } from '../components/SlideControls';

const PresentationPreviewContaner = styled.div`
  width: 100wh;
  height: 100vh;
`;

export const PreviewPresentation = () => {
  const { presentationId } = useParams();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);

  const { userData, isLoading, error, updateUserData } = useUserDataContext();

  console.log(userData);
  const getPresentation = () => {
    return userData.getPresentationById(presentationId);
  };

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

  const handleNextSlideAction = () => {
    setCurrentSlideIndex(currentSlideIndex + 1);
  };

  const handlePreviousSlideAction = () => {
    setCurrentSlideIndex(currentSlideIndex - 1);
  };

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
    <PresentationPreviewContaner>
      <Slide
        presentationId={presentationId}
        slideNumber={currentSlideIndex}
        slideData={userData
          .getPresentationById(presentationId)
          .getSlideByIndex(currentSlideIndex - 1)}
        isPreview={true}
      />
      <SlideControls
        showLeftArrow={showLeftArrow}
        showRightArrow={showRightArrow}
        handleNextSlideAction={handleNextSlideAction}
        handlePreviousSlideAction={handlePreviousSlideAction}
      />
    </PresentationPreviewContaner>
  );
};
