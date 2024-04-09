import React from 'react';
import { waitFor, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PresentationCardsList } from './PresentationCardsList';
import { UserDataContext } from '../context/UserDataContext';
import MockRouter from './MockRouter';

// Create a new QueryClient instance
const queryClient = new QueryClient();

describe('PresentationCardsList Component', () => {
  const presentationsData = [
    { id: 1, title: 'Presentation 1' },
    { id: 2, title: 'Presentation 2' },
  ];

  it('renders loading state when isLoading is true', () => {
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MockRouter>
          <UserDataContext.Provider value={{ isLoading: true }}>
            <PresentationCardsList />
          </UserDataContext.Provider>
        </MockRouter>
      </QueryClientProvider>,
    );

    expect(getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders presentation cards when isLoading is false and userData.presentations is available', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <MockRouter>
          <UserDataContext.Provider
            value={{
              isLoading: false,
              userData: { presentations: presentationsData },
            }}
          >
            <PresentationCardsList />
          </UserDataContext.Provider>
        </MockRouter>
      </QueryClientProvider>,
    );

    // Check if presentation cards are rendered
    await waitFor(() => {
      expect(getByText(presentationsData[0].title)).toBeInTheDocument();
      expect(getByText(presentationsData[1].title)).toBeInTheDocument();
    });
  });
});
