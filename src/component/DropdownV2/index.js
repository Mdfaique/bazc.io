import { useState } from "react";
import "./style.css";

const DropdownV2 = (props) => {
  const [inputVal, setInputVal] = useState("");
  const [consoleVal, setConsoleVal] = useState("");
  const [selectedData, setSelectedData] = useState(""); // To store the selected data from the dropdown
  const [isInputSelected, setIsInputSelected] = useState(true);

  const generateOptionFormat = (type, name) => {
    if (type === "variable") {
      return `{{steps.${name}.input}}`;
    } else if (type === "sum") {
      return `{{steps.${name}.output}}`;
    }
    return name;
  };

  const allNodesData = [
    {
      name: "two",
      type:"sum"
    },
  ];

  // Get the list of available data names from allNodesData
  const availableData = allNodesData.map((node) => node.name);
  const handleInputSelect = (e) => {
    setIsInputSelected(e.target.value === "input");
    setConsoleVal(""); // Clear the input value when selecting from dropdown
  };

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
                setInputVal(e.target.value);
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
                  {/* {data} */}
                  {generateOptionFormat(
                    allNodesData.find((node) => node.name === data)?.type,
                    data
                  )}
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
    </div>
  );
};

export default DropdownV2;
