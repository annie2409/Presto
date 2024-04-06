import { Alert, CircularProgress, Snackbar, Typography } from '@mui/material';
import React, { useState } from 'react';
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

  const { data, isLoading, error } = useUserStorePolling();

  console.log(data, isLoading, error);
  if (isLoading) {
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

  const userData = UserData.fromData(data.store.store);

  const getPresentation = () => {
    console.log(presentationId, userData.presentations);
    return userData.presentations.find(
      (item) => item.id === parseInt(presentationId),
    );
  };

  return (
    <div>
      <NavBar />
      <SplitPaneContainer>
        <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
          <Pane minSize={250} maxSize="37%">
            <PresentationControls presentation={getPresentation()} />
          </Pane>
          <SlideContainer>
            {getPresentation().slides && (
              <Slide
                slideNumber={currentSlideIndex}
                slideData={getPresentation().slides[currentSlideIndex]}
              ></Slide>
            )}

            {!getPresentation().slides && (
              <Typography variant="subtitle2">No slides yet</Typography>
            )}
          </SlideContainer>
        </SplitPane>
      </SplitPaneContainer>
    </div>
  );
};
