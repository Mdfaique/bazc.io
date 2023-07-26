import React, { useState } from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
// import "./style.css";
import DeleteNodeButton from "../../component/DeleteNodeButton/DeleteNodeButton";
import Dropdown from "../../component/Dropdown";

const VariablePopup = (props) => {
  const {
    id,
    variableName,
    setVariableName,
    setPopupVisible,
    variableVal,
    setVariableVal,
  } = props;

  const [variableExists, setVariableExists] = useState(false);

  const selector = (id) => (store) => ({
    setInputVal: (e) =>
      store.updateNode(id, {
        value: variableVal,
        name: variableName,
        type: "input",
      }),
    setType: (e) => store.updateNode(id, { type: e.target.value }),
    nodes: store.nodes,
  });

  const selector2 = (store) => ({
    nodes: store.nodes,
  });

  const { setInputVal } = useStore(selector(id), shallow);

  const store = useStore(selector2, shallow);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setVariableName(newName);

    // Check if the entered variable name already exists in the nodes
    const variableExists = store?.nodes?.some(
      (node) => node?.data?.name === newName && node.id !== id
    );
    setVariableExists(variableExists);
  };

  // Function to handle changes in the input value
  const handleInputChange = (e) => {
    setVariableVal(e.target.value);
  };

  const handlePopupClick = () => {
    setPopupVisible(false);
  };

  // Function to handle saving the variable data
  const handleStoreVariable = (value) => {
    setInputVal(id, { name: variableName, value: value, type: "input" });
    const nodes = useStore.getState().nodes.map((node) =>
      node.id === id
        ? {
            ...node,
            data: {
              ...node.data,
              name: variableName,
              value: variableVal,
              type: "input",
            },
          }
        : node
    );
    const edges = useStore.getState().edges;

    useStore.getState().updateNodesAndEdges(nodes, edges);
    setPopupVisible(false); // Close the popup after saving
  };

  const availableVariables =
    store.nodes?.length > 1
      ? store.nodes
          .filter((node) => node?.id !== id)
          .map((node) => ({
            name: node?.data?.name,
            value: node?.data?.value,
            type: node?.data?.type,
          }))
      : [];

  const handleSelectChange = (selectedValue) => {
    setVariableVal(selectedValue);
  };

  const [inputValues, setInputValues] = useState([variableVal]);
  const handleAddInputField = () => {
    setInputValues([...inputValues, ""]); // Add a new empty input field
  };

  const handleRemoveInputField = (index) => {
    const newInputValues = [...inputValues];
    newInputValues.splice(index, 1); // Remove the input field at the specified index
    setInputValues(newInputValues);
  };
  
  const handleInputChangeAtIndex = (e, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);
  };

  return (
    <div className="node-wrapper variable-node-wrapper">
      <div className="node-component variable-component">
        <p>Variable</p>
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
        <label className="input-dropdown-label">
          <span>Input value</span>
          <div>
            {/* <input
              className="nodrag"
              type="text"
              value={variableVal}
              placeholder={
                availableVariables.length
                  ? "Type or select from dropdown"
                  : "Enter value"
              }
              onChange={handleInputChange}
            />
            {availableVariables.length ? (
              <Dropdown
                options={availableVariables}
                onSelect={handleSelectChange}
              />
            ) : null} */}
            {inputValues.map((inputValue, index) => (
              <div key={index}>
                <input
                  className="nodrag"
                  type="text"
                  value={inputValue}
                  placeholder={
                    availableVariables.length
                      ? "Type or select from dropdown"
                      : "Enter value"
                  }
                  onChange={(e) => handleInputChangeAtIndex(e, index)}
                />
                {availableVariables.length ? (
                  <Dropdown
                    options={availableVariables}
                    onSelect={(selectedValue) =>
                      handleInputChangeAtIndex(
                        { target: { value: selectedValue } },
                        index
                      )
                    }
                  />
                ) : null}
                {index > 0 && (
                  <button onClick={() => handleRemoveInputField(index)}>
                    -
                  </button>
                )}
              </div>
            ))}
            <button onClick={handleAddInputField}>+</button>
          </div>
        </label>
        <button onClick={handlePopupClick}>Cancel</button>
        {!variableExists && (
          <button onClick={() => handleStoreVariable(variableVal)}>Save</button>
        )}
        <DeleteNodeButton nodeId={id} />
      </div>
      <Handle type="target" position="top" isConnectable={true} id="var-b" />
      <Handle type="source" position="bottom" isConnectable={true} id="var-a" />
    </div>
  );
};

const CustomNode = ({ id }) => {
  const storeNodes = useStore((state) => state.nodes, shallow);
  const currentNode = storeNodes.find((node) => node.id === id);

  const [variableName, setVariableName] = useState(
    currentNode?.data?.name || ""
  );
  const [variableVal, setVariableVal] = useState(
    currentNode?.data?.value || ""
  );
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
      variableVal={variableVal}
      setVariableVal={setVariableVal}
      variableName={variableName}
      setVariableName={setVariableName}
      setPopupVisible={setPopupVisible}
      id={id}
    />
  );
};
export default CustomNode;
