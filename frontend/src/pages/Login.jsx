import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Login = () => {
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

  return (
    <div>
      <form>
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
            value={inputs.passwprd}
            onChange={handleInputChange}
            type="password"
            margin="normal"
            sx={{ width: '70%' }}
          />
          <Button
            variant="contained"
            color="primary"
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
