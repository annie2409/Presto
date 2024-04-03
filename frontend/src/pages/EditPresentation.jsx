import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dashboardPage } from '../utils/routes';
import NavBar from '../components/NavBar';
import { useMutation } from 'react-query';
import { updateStore } from '../apis/store';
import { useUserDataContext } from '../context/UserDataContext';

export const EditPresentation = () => {
  const navigation = useNavigate();
  const { presentationId } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  const {
    userData,
    isLoading: userDataIsLoading,
    updateUserData,
  } = useUserDataContext();

  const { mutate, isLoading } = useMutation(updateStore, {
    onSuccess: () => {
      updateUserData(userData);
      navigation(dashboardPage);
    },
    onError: (data) => {
      setDeleteErrorMessage(data.message);
    },
  });

  const handleDeletePresentation = () => {
    console.log(userData);
    const toDeleteIndex = userData.presentations.findIndex(
      (item) => item.id === parseInt(presentationId),
    );

    if (toDeleteIndex !== -1) {
      userData.presentations.splice(toDeleteIndex, 1);
      mutate(userData.toJSON());
    } else {
      setDeleteErrorMessage(
        'The presentation you tried to delete cannot be found.',
      );
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteErrorMessage('');
  };

  if (userDataIsLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <NavBar />
      Presentaiton Page for {presentationId}
      <Button
        variant="contained"
        color="error"
        onClick={() => navigation(dashboardPage)}
      >
        Back
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => setShowDeleteModal(true)}
      >
        Delete
      </Button>
      <Modal
        open={showDeleteModal}
        onClose={closeDeleteModal}
        aria-labelledby="delete-presentation"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: 300,
            width: '40%',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign={'center'}
          >
            Are you sure?
          </Typography>
          {deleteErrorMessage !== '' && (
            <Alert severity="error">{deleteErrorMessage}</Alert>
          )}
          <Box display={'flex'} justifyContent={'center'}>
            <Button
              variant="contained"
              color="error"
              disabled={isLoading}
              onClick={() => handleDeletePresentation()}
              sx={{
                marginRight: '0.5em',
              }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginLeft: '0.5em',
              }}
              onClick={closeDeleteModal}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
