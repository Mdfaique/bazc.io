// Dropdown.js

import React from "react";
import "./style.css";

const Dropdown = ({ options, selectedValue, onSelect }) => {
  const handleSelect = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = options[selectedIndex - 1]; // Get the selected option object
    onSelect(selectedOption);
  };

  return (
    <select value={selectedValue?.system_defined_name} onChange={handleSelect}>
      <option value="">
        {selectedValue?.system_defined_name || "Select a variable or sum"}
      </option>
      {options.map((opt) => {
        return (
          <option
            key={opt?.system_defined_name}
            value={opt?.system_defined_name}
          >
            {opt?.system_defined_name}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdown;
