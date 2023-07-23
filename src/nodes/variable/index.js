import React, { useState } from "react";
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

  const handlePopupClick = () => {
    setPopupVisible(false);
  };

  const handleStoreVariable = () => {
    setPopupVisible(false);
    const existingIndex = allNodesData.findIndex((obj) => obj.id === id);
    if (existingIndex !== -1) {
      allNodesData[existingIndex] = {
        id: id,
        type: "variable",
        name: variableName,
        value: variableVal,
      };
    } else {
      allNodesData.push({
        id: id,
        type: "variable",
        name: variableName,
        value: variableVal,
      });
    }
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
            onChange={(e) => {
              setInputVal(e);
              setVariableName(e.target.value);
            }}
          />
        </label>
        <label>
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
        </label>
        <button onClick={handlePopupClick}>Cancel</button>
        <button onClick={handleStoreVariable}>Save</button>
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
