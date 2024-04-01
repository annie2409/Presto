import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { registerUser } from '../apis/auth.js';
import { TOKEN } from '../utils/storage.js';
import Alert from '@mui/material/Alert';

export const Register = () => {
  const navigation = useNavigate();

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { mutate, isLoading } = useMutation(registerUser, {
    onSuccess: (data) => {
      localStorage.setItem(TOKEN, data.token);
      navigation('/home');
    },
    onError: (data) => {
      setErrorMessage(data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(inputs);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          minWidth={300}
          width="45%"
          maxWidth={450}
          alignItems="center"
          justifyContent="center"
          margin="auto"
          marginTop={5}
          padding={5}
          borderRadius={5}
          boxShadow={'5px 5px 10px #ccc'}
          sx={{
            ':hover': {
              boxShadow: '10px 10px 20px, #ccc',
            },
          }}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            Sign up
          </Typography>
          {errorMessage !== '' && (
            <Alert severity="error">{errorMessage}</Alert>
          )}
          <TextField
            variant="outlined"
            placeholder="Name"
            name="name"
            value={inputs.name}
            onChange={handleInputChange}
            margin="normal"
            sx={{ width: '70%' }}
          />
          <TextField
            variant="outlined"
            placeholder="Email"
            name="email"
            value={inputs.email}
            onChange={handleInputChange}
            type="email"
            margin="normal"
            sx={{ width: '70%' }}
          />
          <TextField
            variant="outlined"
            placeholder="Password"
            name="password"
            value={inputs.password}
            onChange={handleInputChange}
            type="password"
            margin="normal"
            sx={{ width: '70%' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{
              marginTop: 3,
            }}
          >
            Register
          </Button>
          <Link to="/login">
            <Button
              sx={{
                marginTop: 3,
              }}
            >
              Back to login
            </Button>
          </Link>
        </Box>
      </form>
    </div>
  );
};
