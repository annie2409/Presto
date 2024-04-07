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
import { Backspace, NoteAdd, TextFields } from '@mui/icons-material';
import { SLIDE_ELEMENT_TEXT } from '../utils/constants';

export const PresentationControls = ({ currentSlideIndex, presentation }) => {
  const navigation = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  const [
    showDeletePresentationInsteadModal,
    setShowDeletePresentationInsteadModal,
  ] = useState(false);

  const [showEditTitleModal, setShowEditTitleModal] = useState(false);
  const [editTitleErrorMessage, setEditTitleErrorMessage] = useState('');
  const [editPresentationTitle, setEditPresentationTitle] = useState('');

  const [showNewElementModal, setShowNewElementModal] = useState(false);
  const [elementUpdateErrorMessage, setElementUpdateErrorMessage] =
    useState('');
  const [modalElementToCreate, setModalElementToCreate] = useState(null);

  const [newTextElementWidth, setNewTextElementWidth] = useState(null);
  const [newTextElementHeight, setNewTextElementHeight] = useState(null);
  const [newTextElementText, setNewTextElementText] = useState('');
  const [newTextElementFontSize, setNewTextElementFontSize] = useState(null);
  const [newTextElementColor, setNewTextElementFontColor] = useState(null);

  const { userData, updateUserData } = useUserDataContext();

  const { mutate, isLoading } = useMutation(updateStore, {
    onSuccess: (_, variables) => {
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

  const {
    mutate: mutateWithoutFollowupAction,
    isLoading: mutateWithoutFollowupActionLoading,
  } = useMutation(updateStore, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (data) => {
      console.error(data.message);
    },
  });

  const handleDeletePresentation = () => {
    const toDeleteIndex = userData.presentations.findIndex(
      (item) => item.id === parseInt(presentation.id),
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
      (item) => item.id === parseInt(presentation.id),
    );

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

  const closeDeletePresentationInsteadModal = () => {
    setShowDeletePresentationInsteadModal(false);
    setDeleteErrorMessage('');
  };

  const closeEditTitleModal = () => {
    setShowEditTitleModal(false);
    setEditPresentationTitle('');
    setEditTitleErrorMessage('');
  };

  const handleCreateNewSlide = () => {
    const toUpdatePresentation = userData.presentations.find(
      (item) => item.id === parseInt(presentation.id),
    );
    toUpdatePresentation.slides.push({});
    mutateWithoutFollowupAction(userData.toJSON());
    updateUserData(userData);
  };

  const handleDeleteCurrentSlide = () => {
    const target = userData.presentations.find(
      (item) => item.id === parseInt(presentation.id),
    );
    if (target.slides.length === 1) {
      setShowDeletePresentationInsteadModal(true);
    } else {
      target.slides.splice(currentSlideIndex - 1, 1);
      mutateWithoutFollowupAction(userData.toJSON());
      updateUserData(userData);
    }
  };

  const closeNewElementModal = () => {
    setShowNewElementModal(false);
    setElementUpdateErrorMessage('');
    setModalElementToCreate(null);
  };

  const createNewElement = (type) => {
    setModalElementToCreate(type);
    setShowNewElementModal(true);
  };

  const getNewElementModalTitle = () => {
    switch (modalElementToCreate) {
      case SLIDE_ELEMENT_TEXT:
        return 'Create new TEXT';
    }
    return 'Unkonwn';
  };

  const handleCreateNewElement = () => {
    console.log(modalElementToCreate);
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
              {presentation.title}
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
                  disabled={mutateWithoutFollowupActionLoading}
                  color="warning"
                  onClick={() => handleCreateNewSlide()}
                >
                  <NoteAdd />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Tooltip title="Delete current slide">
                <Button
                  variant="contained"
                  disabled={mutateWithoutFollowupActionLoading}
                  color="warning"
                  onClick={() => handleDeleteCurrentSlide()}
                >
                  <Backspace />
                </Button>
              </Tooltip>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Tooltip title="Add text on to the slide">
                <Button
                  variant="contained"
                  disabled={mutateWithoutFollowupActionLoading}
                  color="warning"
                  onClick={() => createNewElement(SLIDE_ELEMENT_TEXT)}
                >
                  <TextFields />
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
      <Modal open={showEditTitleModal} onClose={closeEditTitleModal}>
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
              onClick={closeEditTitleModal}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={showDeletePresentationInsteadModal}
        onClose={closeDeletePresentationInsteadModal}
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
            Do you want to delete presentation instead?
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
              onClick={closeDeletePresentationInsteadModal}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={showNewElementModal} onClose={closeNewElementModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: 400,
            width: '60%',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            justifyContent: 'center',
            alignContent: 'center',
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
            {getNewElementModalTitle()}
          </Typography>
          {elementUpdateErrorMessage !== '' && (
            <Alert severity="error">{elementUpdateErrorMessage}</Alert>
          )}
          {modalElementToCreate === SLIDE_ELEMENT_TEXT && (
            <Grid
              container
              spacing={2}
              justifyContent={'center'}
              direction={'row'}
              alignItems={'center'}
              columns={16}
            >
              <Grid item xs={16} sm={8}>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  alignContent={'center'}
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                >
                  <Typography marginRight={2}>Width:</Typography>
                  <TextField
                    variant="outlined"
                    placeholder="Width (%)"
                    type="number"
                    required={true}
                    inputProps={{
                      min: 0,
                      max: 100,
                    }}
                    name="widthOfNewElementTextArea"
                    value={newTextElementWidth}
                    onChange={(e) => setNewTextElementWidth(e.target.value)}
                    margin="normal"
                    tabIndex={0}
                    autoFocus
                  />
                </Box>
              </Grid>
              <Grid item xs={16} sm={8}>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  alignContent={'center'}
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                >
                  <Typography marginRight={2}>Height:</Typography>
                  <TextField
                    variant="outlined"
                    placeholder="Height (%)"
                    required={true}
                    type="number"
                    inputProps={{
                      min: 0,
                      max: 100,
                    }}
                    name="widthOfNewElementTextArea"
                    value={newTextElementHeight}
                    onChange={(e) => setNewTextElementHeight(e.target.value)}
                    margin="normal"
                    tabIndex={1}
                  />
                </Box>
              </Grid>
              <Grid item xs={16} sm={8}>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  alignContent={'center'}
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                >
                  <Typography marginRight={2}>Font size:</Typography>
                  <TextField
                    variant="outlined"
                    placeholder="Font size (em)"
                    type="number"
                    required={true}
                    name="fontSizeOfNewElementTextArea"
                    value={newTextElementFontSize}
                    onChange={(e) => setNewTextElementFontSize(e.target.value)}
                    margin="normal"
                    tabIndex={2}
                  />
                </Box>
              </Grid>
              <Grid item xs={16} sm={8}>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  alignContent={'center'}
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                >
                  <Typography marginRight={2}>Font color:</Typography>
                  <TextField
                    variant="outlined"
                    placeholder="Color (HEX code)"
                    required={true}
                    name="colorOfNewElementTextArea"
                    value={newTextElementColor}
                    onChange={(e) => setNewTextElementFontColor(e.target.value)}
                    margin="normal"
                    tabIndex={3}
                  />
                </Box>
              </Grid>
            </Grid>
          )}

          <Box display={'flex'} justifyContent={'center'} marginTop={1}>
            <Button
              variant="contained"
              color="warning"
              disabled={mutateWithoutFollowupActionLoading}
              onClick={handleCreateNewElement}
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
              onClick={closeNewElementModal}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
