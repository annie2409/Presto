import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginPage } from '../utils/routes';
import { Button, Modal, Typography } from '@mui/material';
import { NewPresentationForm } from '../components/NewPresentationForm';

export const Dashboard = () => {
  const navigation = useNavigate();
  const { user } = useAuthContext();
  const isLoggedIn = user !== null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigation(loginPage);
    }
  }, []);

  const [isNewPresentationModalOpen, setIsNewPresentationModalOpen] =
    useState(false);

  return (
    <div>
      <NavBar />
      <div>
        <Typography variant="h1">Dashboard</Typography>
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
          <NewPresentationForm></NewPresentationForm>
        </Modal>
      </div>
    </div>
  );
};
