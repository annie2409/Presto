import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

export const NewPresentationForm = () => {
  const [name, setName] = useState('');

  return (
    <Box
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
      <TextField
        variant="outlined"
        placeholder="New presentation name"
        required={true}
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        sx={{ width: '100%' }}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary">
          Create
        </Button>
      </Box>
    </Box>
  );
};
