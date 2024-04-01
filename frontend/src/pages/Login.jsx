import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div>
      <form>
        <Box
          display='flex'
          flexDirection='column'
          minWidth={300}
          width='45%'
          maxWidth={450}
          alignItems='center'
          justifyContent='center'
          margin='auto'
          marginTop={5}
          padding={5}
          borderRadius={5}
          boxShadow={'5px 5px 10px #ccc'}
          sx={{
            ':hover': {
              boxShadow: '10px 10px 20px, #ccc'
            }
          }}
        >
          <Typography variant='h2' padding={3} textAlign='center'>Login</Typography>
          <TextField
            variant='outlined'
            placeholder='Email'
            type='email'
            margin='normal'
            sx={{ width: '70%' }}
          />
          <TextField
            variant='outlined'
            placeholder='Password'
            type='password'
            margin='normal'
            sx={{ width: '70%' }}
          />
          <Button
            variant='contained'
            color='primary'
            sx={{
              marginTop: 3
            }} >
            Login
          </Button>
          <Link to="/register">
            <Button
              sx={{
                marginTop: 3
              }} >
              Sign up
            </Button>
          </Link>
        </Box>
      </form>
    </div>
  );
};
