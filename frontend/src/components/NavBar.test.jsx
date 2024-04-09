import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import NavBar from './NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider, useAuthContext } from '../context/AuthContext'; // Assuming AuthContextProvider wraps the NavBar with AuthContext
import { useUserDataContext } from '../context/UserDataContext';

// Mock useAuthContext and useUserDataContext hooks
jest.mock('../context/AuthContext');
jest.mock('../context/UserDataContext');

describe('NavBar Component', () => {
  beforeEach(() => {
    // Mock the updateUser and updateUserData functions
    useAuthContext.mockReturnValue({
      user: { token: 'mockedToken' },
      updateUser: jest.fn(),
    });
    useUserDataContext.mockReturnValue({
      updateUserData: jest.fn(),
    });
  });

  it('calls handleLogout when Logout button is clicked', async () => {
    const mockedLogoutFunction = jest.fn(); // Create a mocked logout function

    const { getByText } = render(
      <Router>
        <AuthContextProvider>
          <NavBar />
        </AuthContextProvider>
      </Router>,
    );

    // Mock the useMutation hook
    jest.mock('react-query', () => ({
      useMutation: (logoutFunction) => ({
        mutate: (token) => logoutFunction(token),
        isLoading: false,
      }),
    }));

    // Find and click the logout button
    const logoutButton = getByText('Logout');
    fireEvent.click(logoutButton);

    // Wait for the asynchronous operation (logout) to complete
    await waitFor(() =>
      expect(mockedLogoutFunction).toHaveBeenCalledWith('mockedToken'),
    );
  });
});
