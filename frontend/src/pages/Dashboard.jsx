import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginPage } from '../utils/routes';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Modal,
  Typography,
} from '@mui/material';
import { NewPresentationForm } from '../components/NewPresentationForm';
import { UserDataProvider } from '../context/UserDataContext';
import { PresentationCardsList } from '../components/PresentationCardsList';

export const Dashboard = () => {
  const navigation = useNavigate();
  const { user } = useAuthContext();
  const isLoggedIn = user !== null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigation(loginPage);
    }
  }, [user]);

  const [isNewPresentationModalOpen, setIsNewPresentationModalOpen] =
    useState(false);

  if (!isLoggedIn) {
    return (
      <Box
        position={'fixed'}
        top={'50%'}
        left={'50%'}
        transform={'translate(-50%, -50%)'}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <UserDataProvider>
      <NavBar />
      <div>
        <Container>
          <Typography variant="h3">Dashboard</Typography>
          <Typography variant="subtitle1">{`Welcome ${user.email}`}</Typography>
          <Button
            variant="contained"
            color="warning"
            onClick={() => setIsNewPresentationModalOpen(true)}
          >
            New presentation
          </Button>
          <Modal
            open={isNewPresentationModalOpen}
            onClose={() => setIsNewPresentationModalOpen(false)}
            aria-labelledby="modal-new-presentation-title"
          >
            <NewPresentationForm
              onSubmit={() => setIsNewPresentationModalOpen(false)}
            />
          </Modal>
          <PresentationCardsList />
        </Container>
      </div>
    </UserDataProvider>
  );
};
