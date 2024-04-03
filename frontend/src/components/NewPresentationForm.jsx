import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, forwardRef } from 'react';
import { updateStore } from '../apis/store';
import { useUserDataContext } from '../context/UserDataContext';
import { useMutation } from 'react-query';
import { Presentation } from '../data/presentation';

export const NewPresentationForm = forwardRef((props, ref) => {
  // Forward the ref
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {
    userData,
    isLoading: userDataIsLoading,
    updateUserData,
  } = useUserDataContext();

  const { mutate, isLoading } = useMutation(updateStore, {
    onSuccess: () => {
      updateUserData(userData);
      props.onSubmit();
    },
    onError: (data) => {
      setErrorMessage(data.message);
    },
  });

  const handleCreate = () => {
    const presentation = new Presentation(Date.now(), name, description);
    userData.presentations.push(presentation);
    mutate(userData.toJSON());
  };

  if (userDataIsLoading) {
    return <CircularProgress />;
  }

  return (
    <Box
      ref={ref} // Pass the ref to the outermost element
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 400,
        width: '80%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Create new presentation
      </Typography>
      {errorMessage !== '' && <Alert severity="error">{errorMessage}</Alert>}
      <TextField
        variant="outlined"
        placeholder="New presentation name"
        required={true}
        name="newPresentationName"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        sx={{ width: '100%' }}
        tabIndex={0}
        autoFocus
      />
      <TextField
        variant="outlined"
        placeholder="Description"
        name="newPresentationDescription"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        sx={{ width: '100%' }}
        tabIndex={1}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          disabled={isLoading}
          onClick={handleCreate}
          tabIndex={2}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
});

NewPresentationForm.displayName = 'NewPresentationForm';
