import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SlideControls } from './SlideControls';

describe('SlideControls Component', () => {
  it('renders slide controls with left and right arrows', async () => {
    const handlePrevious = jest.fn();
    const handleNext = jest.fn();

    const { getByTestId } = await render(
      <SlideControls
        handlePreviousSlideAction={handlePrevious}
        handleNextSlideAction={handleNext}
        showLeftArrow={true}
        showRightArrow={true}
      />,
    );

    // Check if both arrows are rendered
    expect(getByTestId('previous-button')).toBeInTheDocument();
    expect(getByTestId('next-button')).toBeInTheDocument();
  });

  it('calls handlePreviousSlideAction when left arrow is clicked', async () => {
    const handlePrevious = jest.fn();
    const handleNext = jest.fn();

    const { getByTestId } = await render(
      <SlideControls
        handlePreviousSlideAction={handlePrevious}
        handleNextSlideAction={handleNext}
        showLeftArrow={true}
        showRightArrow={true}
      />,
    );

    // Click the left arrow button
    fireEvent.click(getByTestId('previous-button'));

    // Check if handlePreviousSlideAction is called
    expect(handlePrevious).toHaveBeenCalledTimes(1);
    expect(handleNext).not.toHaveBeenCalled(); // Ensure handleNextSlideAction is not called
  });

  it('calls handleNextSlideAction when right arrow is clicked', () => {
    const handlePrevious = jest.fn();
    const handleNext = jest.fn();

    const { getByTestId } = render(
      <SlideControls
        handlePreviousSlideAction={handlePrevious}
        handleNextSlideAction={handleNext}
        showLeftArrow={true}
        showRightArrow={true}
      />,
    );

    // Click the right arrow button
    fireEvent.click(getByTestId('next-button'));

    // Check if handleNextSlideAction is called
    expect(handleNext).toHaveBeenCalledTimes(1);
    expect(handlePrevious).not.toHaveBeenCalled(); // Ensure handlePreviousSlideAction is not called
  });
});
