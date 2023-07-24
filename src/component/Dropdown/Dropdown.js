// Dropdown.js

import React from "react";

const Dropdown = ({ options, selectedValue, onSelect, onChange }) => {
  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    onSelect(selectedValue);
  };

  return (
    <select value={selectedValue} onChange={handleSelect} onClick={onChange}>
      <option value="">Select a variable or sum</option>
      {options.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
