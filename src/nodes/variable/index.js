import React, { useState, useMemo } from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import "./style.css";
import allNodesData from "../../allNodesData";

const selector = (id) => (store) => ({
  setInputVal: (e) => store.updateNode(id, { inputVal: e.target.value }),
  setType: (e) => store.updateNode(id, { type: e.target.value }),
});

const VariablePopup = (props) => {
  const {
    id,
    variableVal,
    setVariableVal,
    variableName,
    setVariableName,
    setPopupVisible,
  } = props;

  const { setInputVal } = useStore(selector(id), shallow);
  const [selectedVariable, setSelectedVariable] = useState("");

  const handlePopupClick = () => {
    setPopupVisible(false);
  };

  // const handleStoreVariable = () => {
  //   setPopupVisible(false);
  //   const existingIndex = allNodesData.findIndex((obj) => obj.id === id);
  //   if (existingIndex !== -1) {
  //     allNodesData[existingIndex] = {
  //       id: id,
  //       type: "variable",
  //       name: variableName,
  //       value: variableVal,
  //     };
  //   } else {
  //     allNodesData.push({
  //       id: id,
  //       type: "variable",
  //       name: variableName,
  //       value: variableVal,
  //     });
  //   }
  // };

  const handleStoreVariable = () => {
    setPopupVisible(false);

    // Check if the variable name is already present in allNodesData for other nodes
    const variableExists = allNodesData.some(
      (node) => node.name === variableName && node.id !== id
    );

    if (!variableExists) {
      const existingIndex = allNodesData.findIndex((obj) => obj.id === id);

      if (existingIndex !== -1) {
        allNodesData[existingIndex] = {
          ...allNodesData[existingIndex], // Keep the existing properties
          value: variableVal, // Update the value with the new input value
        };
      } else {
        allNodesData.push({
          id: id,
          type: "variable",
          name: variableName,
          value: variableVal,
        });
      }
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setVariableName(newName);

    // Check if the entered variable name already exists in allNodesData for other nodes
    const variableExists = allNodesData.some(
      (node) => node.name === newName && node.id !== id
    );

    if (variableExists) {
      setVariableVal(""); // Reset the value if the variable already exists for other nodes
    }
  };

  const handleInputChange = (e) => {
    setInputVal(e);
    setVariableVal(e.target.value);
  };

  const handleSelectChange = (e) => {
    const selectedVariable = e.target.value;
    setSelectedVariable(selectedVariable); // Store the selected variable in its own state
    const selectedNode = allNodesData.find(
      (node) => node.name === selectedVariable
    );
    if (selectedNode) {
      setVariableVal(selectedNode.value);
    }
  };

   // Get the list of available variable names from allNodesData
   const availableVariables = allNodesData
   .filter((node) => node.type === "variable" && node.id !== id) // Filter out the current node's name
   .map((node) => node.name);
   
  // Calculate variableExists dynamically using useMemo
  const variableExists = useMemo(() => {
    return allNodesData.some(
      (node) => node.name === variableName && node.id !== id
    );
  }, [variableName, id]);

  return (
    <div className="node-wrapper variable-node-wrapper">
      <div className="node-component variable-component">
        <p>Variable</p>
        {/* <label>
          <span>Name</span>
          <input
            className="nodrag"
            type="text"
            value={variableName}
            onChange={(e) => {
              setInputVal(e);
              setVariableName(e.target.value);
            }}
          />
        </label> */}
        {/* <label>
          <span>Input value</span>
          <input
            className="nodrag"
            type="number"
            value={variableVal}
            placeholder="{{input:data1}}"
            onChange={(e) => {
              setInputVal(e);
              setVariableVal(e.target.value);
            }}
          />
        </label> */}
        <label>
          <span>Name</span>
          <input
            className="nodrag"
            type="text"
            value={variableName}
            placeholder="Enter variable name"
            onChange={handleNameChange}
          />
          {variableExists && (
            <span style={{ color: "red" }}>Choose another name</span>
          )}
        </label>
        <label>
          <span>Input value</span>
          <div>
            <input
              className="nodrag"
              type="number"
              value={variableVal}
              placeholder="Type or select from dropdown"
              onChange={handleInputChange}
            />
            <select value={selectedVariable} onChange={handleSelectChange}>
              <option value="">Select a variable</option>
              {availableVariables.map((variable) => (
                <option key={variable} value={variable}>
                  {variable}
                </option>
              ))}
            </select>
          </div>
        </label>
        <button onClick={handlePopupClick}>Cancel</button>
        {!variableExists && <button onClick={handleStoreVariable}>Save</button>}
      </div>
      <Handle type="target" position="top" isConnectable={true} id="var-b" />
      <Handle type="source" position="bottom" isConnectable={true} id="var-a" />
    </div>
  );
};

const Variable = ({ id }) => {
  const [variableVal, setVariableVal] = useState("");
  const [variableName, setVariableName] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  const handlePopupClick = () => {
    setPopupVisible(true);
  };

  return !popupVisible ? (
    <div className="node-box" onClick={handlePopupClick}>
      <p>Variable</p>
      <span>{variableName || "New variable"}</span>
      <Handle type="target" position="top" isConnectable={true} id="b" />
      <Handle type="source" position="bottom" isConnectable={true} id="a" />
    </div>
  ) : (
    <VariablePopup
      variableName={variableName}
      setVariableName={setVariableName}
      variableVal={variableVal}
      setVariableVal={setVariableVal}
      setPopupVisible={setPopupVisible}
      id={id}
    />
  );
};
export default Variable;
