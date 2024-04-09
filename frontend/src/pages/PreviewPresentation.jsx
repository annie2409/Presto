import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserDataContext } from '../context/UserDataContext';
import { Slide } from '../components/Slide';
import styled from 'styled-components';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { SlideControls } from '../components/SlideControls';
import { previewPresentationPageAtSlideFor } from '../utils/routes';

const PresentationPreviewContaner = styled.div`
  width: 100wh;
  height: 100vh;
`;

export const PreviewPresentation = () => {
  const { presentationId, slide } = useParams();
  const navigation = useNavigate();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);

  const { userData, isLoading, error } = useUserDataContext();

  const getPresentation = () => {
    return userData.getPresentationById(presentationId);
  };

  useEffect(() => {
    if (slide) {
      setCurrentSlideIndex(parseInt(slide));
    }
  }, [slide]);

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
    navigation(
      previewPresentationPageAtSlideFor(presentationId, currentSlideIndex + 1),
    );
  };

  const handlePreviousSlideAction = () => {
    navigation(
      previewPresentationPageAtSlideFor(presentationId, currentSlideIndex - 1),
    );
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
