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

const findVariableValue = (variableName) => {
  for (const nodeData of allNodesData) {
    if (nodeData.type === "variable" && nodeData.name === variableName) {
      return Number(nodeData.value);
    }
  }
  return null;
};

const isNumericValue = (value) => {
  const numericRegex = /^[0-9]+$/;
  return numericRegex.test(value);
};

const sum = (var1, var2) => {
  if (!var1 || !var2) return;
  const param1 = isNumericValue(var1) ? Number(var1) : findVariableValue(var1);
  const param2 = isNumericValue(var2) ? Number(var2) : findVariableValue(var2);
  return param1 + param2;
};

const SumPopup = (props) => {
  const {
    id,
    sumName,
    setSumName,
    variable1,
    setVariable1,
    variable2,
    setVariable2,
    setPopupVisible,
  } = props;
  const { setInputVal } = useStore(selector(id), shallow);

  const handlePopupClick = () => {
    setPopupVisible(false);
  };
  const handleStoreSum = () => {
    setPopupVisible(false);
    const existingIndex = allNodesData.findIndex((obj) => obj.id === id);
    if (existingIndex !== -1) {
      allNodesData[existingIndex] = {
        id: id,
        type: "sum",
        name: sumName,
        params: { var1: variable1, var2: variable2 },
        value: sum(variable1, variable2),
      };
    } else {
      allNodesData.push({
        id: id,
        type: "sum",
        name: sumName,
        params: { var1: variable1, var2: variable2 },
        value: sum(variable1, variable2),
      });
    }
  };

  return (
    <div className="node-wrapper sum-node-wrapper">
      <div className="node-component sum-component">
        <p>Sum</p>
        <label>
          <span>Name</span>
          <input
            className="nodrag"
            type="text"
            value={sumName}
            onChange={(e) => {
              setInputVal(e);
              setSumName(e.target.value);
            }}
            onBlur={handleStoreSum}
          />
        </label>
        <label>
          <span>Input value 1</span>
          <input
            className="nodrag"
            type="text"
            placeholder="{{input:data1}}"
            value={variable1}
            onChange={(e) => {
              setInputVal(e);
              setVariable1(e.target.value);
            }}
            onBlur={handleStoreSum}
          />
        </label>
        <label>
          <span>Input value 2</span>
          <input
            className="nodrag"
            type="text"
            placeholder="{{input:data2}}"
            value={variable2}
            onChange={(e) => {
              setInputVal(e);
              setVariable2(e.target.value);
            }}
            onBlur={handleStoreSum}
          />
        </label>
        <button onClick={handlePopupClick}>Cancel</button>
        <button onClick={handleStoreSum}>Save</button>
      </div>
      <Handle type="target" position="top" isConnectable={true} id="sum-b" />
      <Handle type="source" position="bottom" isConnectable={true} id="sum-a" />
    </div>
  );
};

const Sum = ({ id }) => {
  const [sumName, setSumName] = useState("");
  const [variable1, setVariable1] = useState("");
  const [variable2, setVariable2] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  const handlePopupClick = () => {
    setPopupVisible(true);
  };

  return !popupVisible ? (
    <div className="node-box" onClick={handlePopupClick}>
      <p>Sum</p>
      <span>{sumName || "New sum"}</span>
    </div>
  ) : (
    <SumPopup
      sumName={sumName}
      setSumName={setSumName}
      variable1={variable1}
      setVariable1={setVariable1}
      variable2={variable2}
      setVariable2={setVariable2}
      id={id}
      setPopupVisible={setPopupVisible}
    />
  );
};

export default Sum;
