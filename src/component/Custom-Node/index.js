import { useState, useContext } from "react";
import Button from "../Button";
import './style.css';
import { SidebarDataContext } from "../../store/SidebarDataContext";

const CustomNode = (props) => {

  const {setShowCustomNode} = props;
  const [actionName, setActionName] = useState("");
  const [logicInput, setLogicInput] = useState("");
  const [displayVal, setDisplayVal] = useState("");
  const [inputVals, setInputVals] = useState([]);
  const [output, setOutput] = useState(undefined);

  const { sidebarData, setSidebarData } = useContext(SidebarDataContext);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setDisplayVal(value);
  };

  const handleParameterChange = (index, key, value) => {
    const updatedInputVals = [...inputVals];
    if (!updatedInputVals[index]) {
      updatedInputVals[index] = {};
    }
    updatedInputVals[index][key] = value;
    setInputVals(updatedInputVals);
  };

  const generateParameterInputs = () => {
    const inputs = [];
    for (let i = 1; i <= displayVal; i++) {
      const index = i - 1; // Adjusted index for array access
      if (!inputVals[index] || !inputVals[index]["type"]) {
      }
      inputs.push(
        <div key={i}>
          <div>Parameter {i}</div>
          <div>
            <label>
              Type:
              <select
                onChange={(e) =>
                  handleParameterChange(index, "type", e.target.value)
                }
              ><option value="">Select type</option>
                <option value="int">Number</option>
                <option value="string">Char</option>
                <option value="bool">Bool</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Name:
              <input
                type="text"
                onChange={(e) =>
                  handleParameterChange(index, "parameter_name", e.target.value)
                }
              />
            </label>
          </div>
        </div>
      );
    }
    return inputs;
  };

  const handleLogicInput = (e) => {
    const newValue = e.target.value;
    setLogicInput(newValue);
    console.log(newValue);
  };

  const handleCancel = () => {
    setShowCustomNode(false);
  }

  const handleActionName = (e) => {
    const newName = e.target.value;
    setActionName(newName);
  }

  const handleSave = () => {
    const data = {
      block_type: "action",
      sub_type: actionName,
      total_inputs: displayVal,
      input_value: inputVals,
      function_body: logicInput,
      output_type: output,
      output_value: undefined,
      return: output !== undefined ? true : false,
      system_defined_name: undefined,
      user_defined_name: undefined,
      custom: true
    };

    const updatedSidebarData = { ...sidebarData };
    updatedSidebarData.action.push(data);

    localStorage.setItem("SidebarData", JSON.stringify(updatedSidebarData));
  
    setSidebarData(updatedSidebarData);

    setShowCustomNode(false);
  }

  return (
    <>
      <div className="custom-node-wrapper">
        <div className="node-wrapper custom-component">
          <p>Custom Node</p>
          <label>
            <span>Name</span>
            <input
              className="nodrag"
              type="text"
              value={actionName}
              placeholder="Enter custom name"
              onChange={handleActionName}
            />
          </label>
          <label className="input-dropdown-label">
            <span>Number of Inputs</span>
            <div>
              <input
                className="nodrag"
                type="number"
                value={displayVal}
                placeholder="Enter value"
                onChange={handleInputChange}
              />
            </div>
          </label>
          {displayVal && generateParameterInputs()}
          <label>
            Output Type:
            <select onChange={(e)=>setOutput(e.target.value)}>
            <option value="select">Select output type</option>
              <option value="int">Number</option>
              <option value="string">Char</option>
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
          <div className="btn-group">
          <Button
            name="❌"
            onClick={handleCancel}
          />
          <Button
            name="💾"
            onClick={handleSave}
          />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomNode;
