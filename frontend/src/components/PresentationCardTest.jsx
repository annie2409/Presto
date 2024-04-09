import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PresentationCard } from './PresentationCard';

// Mock presentation data for testing
const mockPresentation = {
  id: 1,
  title: 'Mock Presentation',
  description: 'This is a mock presentation',
  slides: [
    /* mock slides data */
  ],
  getThumbnail: () => null, // Mock getThumbnail method
};

describe('PresentationCard', () => {
  it('renders presentation title and description correctly', () => {
    render(<PresentationCard presentation={mockPresentation} />);

    const titleElement = screen.getByText('Mock Presentation');
    const descriptionElement = screen.getByText('This is a mock presentation');

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it('triggers navigation when clicked', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      useNavigate: () => mockNavigate,
    }));

    render(<PresentationCard presentation={mockPresentation} />);

    const cardElement = screen.getByRole('button');
    fireEvent.click(cardElement);

    expect(mockNavigate).toHaveBeenCalledWith('/edit/presentation/1');
  });

  // Add more tests as needed
});
