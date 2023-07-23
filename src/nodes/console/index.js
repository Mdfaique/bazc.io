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

const Console = ({ id }) => {
  const { setInputVal } = useStore(selector(id), shallow);

  const [consoleVal, setConsoleVal] = useState("");
  const [selectedData, setSelectedData] = useState(""); // To store the selected data from the dropdown
  const [isInputSelected, setIsInputSelected] = useState(true);

  const handleConsole = () => {
    if (isInputSelected) {
      console.log(consoleVal); // Print the value from the input field
    } else {
      // Find the node with the selected variable name
      const selectedNode = allNodesData.find(
        (node) => node.name === selectedData
      );

      if (selectedNode) {
        console.log(selectedNode.value); // Print the value of the selected node to the console
      } else {
        console.log("Selected variable not found in allNodesData");
      }
    }
  };

  const handleInputSelect = (e) => {
    setIsInputSelected(e.target.value === "input");
    setConsoleVal(""); // Clear the input value when selecting from dropdown
  };

  // Get the list of available data names from allNodesData
  const availableData = allNodesData.map((node) => node.name);

  return (
    <div className="node-wrapper console-node-wrapper">
      <div className="node-component console-component">
        <p>Console Node</p>
        <label>
          <span>Enter</span>
          {isInputSelected ? (
            <input
              className="nodrag"
              type="text"
              value={consoleVal}
              onChange={(e) => {
                setInputVal(e);
                setConsoleVal(e.target.value);
              }}
            />
          ) : (
            <select
              value={selectedData}
              onChange={(e) => setSelectedData(e.target.value)}
            >
              <option value="">Select data</option>
              {availableData.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          )}
        </label>
        <select
          value={isInputSelected ? "input" : "dropdown"}
          onChange={handleInputSelect}
        >
          <option value="input">Type Input</option>
          <option value="dropdown">Select from Dropdown</option>
        </select>
        <button onClick={handleConsole}>Print value</button>
      </div>
      <Handle type="target" position="top" isConnectable={true} id="b" />
      <Handle type="source" position="bottom" isConnectable={true} id="a" />
    </div>
  );
};

export default Console;
