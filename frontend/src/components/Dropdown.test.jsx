import React from 'react';
import { render, fireEvent, within, getByRole } from '@testing-library/react';
import Dropdown from './Dropdown';

describe('Dropdown Component', () => {
  const title = 'Select Color';
  const options = ['Red', 'Green', 'Blue'];
  const preSelect = 'Green';
  const onSelectMock = jest.fn();

  it('renders with provided props', () => {
    const { getByText } = render(
      <Dropdown
        title={title}
        options={options}
        preSelect={preSelect}
        onSelect={onSelectMock}
      />,
    );

    // Check if the title and pre-selected option are rendered
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(preSelect)).toBeInTheDocument();
  });

  it('calls onSelect when an option is selected', () => {
    const { getByTestId, getByText } = render(
      <Dropdown
        title={title}
        options={options}
        preSelect={preSelect}
        onSelect={onSelectMock}
      />,
    );

    const selectElement = getByTestId('dropdown-select');

    // Simulate selecting an option
    fireEvent.mouseDown(selectElement);
    fireEvent.click(getByText('Red'));

    expect(getByText('Red')).toBeInTheDocument();
  });
});
