import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Dropdown = ({ title, options, preSelect, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState(preSelect);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="dropdown-label">{title}</InputLabel>
      <Select
        native={true}
        labelId="dropdown-label"
        id="dropdown"
        value={selectedValue}
        onChange={handleChange}
        label="Select an option"
        data-testid="dropdown-select"
      >
        {options.map((option, index) => {
          return (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
