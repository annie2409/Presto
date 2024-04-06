import { Alert, CircularProgress, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SplitPane from 'split-pane-react/esm/SplitPane';
import { Pane } from 'split-pane-react';
import { PresentationControls } from '../components/PresentationControls';
import 'split-pane-react/esm/themes/default.css';
import { useUserStorePolling } from '../apis/store';
import { UserData } from '../data/userData';

export const EditPresentation = () => {
  const { presentationId } = useParams();

  const layoutCSS = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const [sizes, setSizes] = useState([150, '30%', 'auto']);

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
      <div style={{ height: '100vh', width: '100wh' }}>
        <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
          <Pane minSize={250} maxSize="37%">
            {/* <div style={{ background: '#ddd' }}>pane1</div> */}
            <PresentationControls presentation={getPresentation()} />
          </Pane>
          <div style={{ ...layoutCSS, background: '#d5d7d9' }}>pane2</div>
        </SplitPane>
      </div>
    </div>
  );
};
