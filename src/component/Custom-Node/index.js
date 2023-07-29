import { useState } from "react";

const CustomNode2 = () => {
  const [logicInput, SetLogicInput] = useState("");
  const [displayVal, setDisplayVal] = useState("");
  const [variableVal, setVariableVal] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setDisplayVal(value);
  };
  


  const generateParameterInputs = () => {
    const inputs = [];
    for (let i = 1; i <= displayVal; i++) {
      inputs.push(
        <div key={i}>
          <div>Parameter {i}</div>
          <div>
            <label>
              Type:
              <select>
                <option value="number">Number</option>
                <option value="char">Char</option>
                <option value="bool">Bool</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Name:
              <input type="text" />
            </label>
          </div>
        </div>
      );
    }
    return inputs;
  };

  const handleLogicInput = (e) => {
    const newValue = e.target.value;
    SetLogicInput(newValue);
    console.log(newValue);
  };

  return (
    <>
      <div className="node-wrapper variable-node-wrapper">
        <div className="node-component variable-component">
          <p>Custom Node</p>
          <label>
            <span>Name</span>
            <input
              className="nodrag"
              type="text"
              value=""
              placeholder="Enter custom name"
              onChange={()=>{console.log("nameINput")}}
            />
          </label>
          <label className="input-dropdown-label">
            <span>Number of Inputs</span>
            <div>
              <input
                className="nodrag"
                type="number"
                value={displayVal ?? variableVal}
                placeholder="Enter value"
                onChange={handleInputChange}
              />
            </div>
          </label>
          {displayVal && generateParameterInputs()}
          <label>
            Output Type:
            <select>
              <option value="number">Number</option>
              <option value="char">Char</option>
              <option value="bool">Bool</option>
            </select>
          </label>
          <span>Provide Logic</span>
          <textarea
            className="nodrag"
            type="text"
            placeholder="Enter Logic"
            value={logicInput}
            onChange={handleLogicInput}
          />
          <button
            onClick={() => {
              console.log("canceld");
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("saved");
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomNode2;
