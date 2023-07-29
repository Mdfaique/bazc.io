import { useState } from "react";
import "./style.css";

const InputSelect = (props) => {
  const { handleInputChange, inputValue, selectedValue, inputSelected, handleSelectChange } = props;
  const [inputVal, setInputVal] = useState(inputValue);
  const [selectedData, setSelectedData] = useState(selectedValue);
  const [isInputSelected, setIsInputSelected] = useState(inputSelected);

  const handleInputSelect = (e) => {
    setIsInputSelected(e.target.value === "input");
    setInputVal("");
  };

  const handleInputChanges = (e) => {
    const inputValue = e.target.value;
    if (handleInputChange) {
      handleInputChange(inputValue);
    }
    setInputVal(inputValue);
  };

  const handleSelectChanges = (e) => {
    const selectedVar = e.target.value;
    const selectedOption = props.options.find(
      (option) => option.system_defined_name === e.target.value
    );
    console.log(props.options)
    const selectedValue = selectedOption?.input_value[0]?.value;
    const selectedValueVar = selectedOption?.user_defined_name;
    if (handleSelectChange) {
      handleSelectChange({selectedVar, selectedValue, selectedValueVar});
    }
    setSelectedData(selectedVar);
  };
  

  return (
    <div className="custom-input-select">
          {isInputSelected ? (
            <input
              className="nodrag"
              type="text"
              value={inputVal}
              onChange={handleInputChanges}
            />
          ) : (
            <select
              value={selectedData}
              onChange={handleSelectChanges}
            >
              <option value="">Select data</option>
              {props.options.map((data) => (
                <option key={data?.id} value={data?.system_defined_name}>
                  {data?.system_defined_name}
                </option>
              ))}
            </select>
          )}
        <select
          value={isInputSelected ? "input" : "dropdown"}
          onChange={handleInputSelect}
        >
          <option value="input">Type Input</option>
          <option value="dropdown">Select from Dropdown</option>
        </select>
    </div>
  );
};

export default InputSelect;
