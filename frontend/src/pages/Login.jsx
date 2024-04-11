import React, { useState } from 'react';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../apis/auth';
import { useMutation } from 'react-query';
import { useAuthContext } from '../context/AuthContext';
import { LoggedInUser } from '../data/loggedInUser.js';
import { dashboardPage } from '../utils/routes';

export const Login = () => {
  const navigation = useNavigate();
  const { updateUser } = useAuthContext();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [errorMessage, setErrorMessage] = useState('');

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      updateUser(new LoggedInUser(inputs.email, data.token));
      navigation(dashboardPage);
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
            Login
          </Typography>
          {errorMessage !== '' && (
            <Alert severity="error">{errorMessage}</Alert>
          )}
          <TextField
            variant="outlined"
            placeholder="Email"
            required={true}
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
            required={true}
            value={inputs.passwprd}
            onChange={handleInputChange}
            type="password"
            margin="normal"
            sx={{ width: '70%' }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
            sx={{
              marginTop: 3,
            }}
          >
            Login
          </Button>
          <Link to="/register">
            <Button
              sx={{
                marginTop: 3,
              }}
            >
              Sign up
            </Button>
          </Link>
        </Box>
      </form>
    </div>
  );
};
