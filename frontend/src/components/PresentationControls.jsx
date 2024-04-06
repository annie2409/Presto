import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Stack,
  Modal,
  Typography,
  Container,
  IconButton,
  TextField,
  Grid,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { dashboardPage } from '../utils/routes';
import { useMutation } from 'react-query';
import { updateStore } from '../apis/store';
import { useUserDataContext } from '../context/UserDataContext';
import { NoteAdd } from '@mui/icons-material';

export const PresentationControls = (props) => {
  const navigation = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  const [showEditTitleModal, setShowEditTitleModal] = useState(false);
  const [editTitleErrorMessage, setEditTitleErrorMessage] = useState('');
  const [editPresentationTitle, setEditPresentationTitle] = useState('');

  const { userData, updateUserData } = useUserDataContext();

  const { mutate, isLoading } = useMutation(updateStore, {
    onSuccess: (data, variables) => {
      console.log(data, variables);
      updateUserData(userData);
      if (variables.nextPage) {
        navigation(variables.nextPage);
      } else {
        setShowEditTitleModal(false);
      }
    },
    onError: (data) => {
      setDeleteErrorMessage(data.message);
    },
  });

  const { mutate: inserNewSlide, isLoading: inserNewSlideLoading } =
    useMutation(updateStore, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (data) => {
        console.error(data.message);
      },
    });

  const handleDeletePresentation = () => {
    const toDeleteIndex = userData.presentations.findIndex(
      (item) => item.id === parseInt(props.presentation.id),
    );

    if (toDeleteIndex !== -1) {
      userData.presentations.splice(toDeleteIndex, 1);
      mutate({ ...userData.toJSON(), nextPage: dashboardPage });
    } else {
      setDeleteErrorMessage(
        'The presentation you tried to delete cannot be found.',
      );
    }
  };

  const handleEditPresentationTitle = () => {
    const toUpdatePresentation = userData.presentations.find(
      (item) => item.id === parseInt(props.presentation.id),
    );
    console.log(toUpdatePresentation);

    if (toUpdatePresentation) {
      toUpdatePresentation.title = editPresentationTitle;
      mutate(userData.toJSON());
    } else {
      setEditTitleErrorMessage(
        'The presentation you tried to update cannot be found.',
      );
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteErrorMessage('');
  };

  const closeEditTitleodal = () => {
    setShowEditTitleModal(false);
    setEditPresentationTitle('');
    setEditTitleErrorMessage('');
  };

  const handleCreateNewSlide = () => {
    const toUpdatePresentation = userData.presentations.find(
      (item) => item.id === parseInt(props.presentation.id),
    );
    toUpdatePresentation.slides.push({});
    inserNewSlide(userData.toJSON());
    updateUserData(userData);
  };

  return (
    <>
      <Container>
        <Stack>
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignContent={'center'}
            justifyContent={'space-between'}
            alignItems={'center'}
            maxHeight={'10%'}
            overflow={'ellipse'}
            textOverflow={'ellipsis'}
          >
            <Typography variant="h5" color={'black'} overflow={'ellipse'}>
              {props.presentation.title}
            </Typography>
            <IconButton onClick={() => setShowEditTitleModal(true)}>
              <EditIcon />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Tooltip title="Go back to dashboard">
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => navigation(dashboardPage)}
                >
                  <ArrowBackIcon />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Tooltip title="Delete presentation">
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Tooltip title="Add new slide">
                <Button
                  variant="contained"
                  disabled={inserNewSlideLoading}
                  color="warning"
                  onClick={() => handleCreateNewSlide()}
                >
                  <NoteAdd />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Stack>
      </Container>
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
      <Modal
        open={showEditTitleModal}
        onClose={() => setShowEditTitleModal(false)}
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit presentation title
          </Typography>
          {editTitleErrorMessage !== '' && (
            <Alert severity="error">{editTitleErrorMessage}</Alert>
          )}
          <TextField
            variant="outlined"
            placeholder="New presentation name"
            required={true}
            name="newPresentationName"
            value={editPresentationTitle}
            onChange={(e) => setEditPresentationTitle(e.target.value)}
            margin="normal"
            sx={{ width: '100%' }}
            tabIndex={0}
            autoFocus
          />
          <Box display={'flex'} justifyContent={'center'}>
            <Button
              variant="contained"
              color="warning"
              disabled={isLoading}
              onClick={() => handleEditPresentationTitle()}
              sx={{
                marginRight: '0.5em',
              }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginLeft: '0.5em',
              }}
              onClick={closeEditTitleodal}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
