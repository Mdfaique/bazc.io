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
      {options.map((opt) => (
        <option key={opt.name} value={opt.value}>
          {`steps.${opt.name}.${opt.type}`}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
