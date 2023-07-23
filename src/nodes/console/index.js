import React, { useState } from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import "./style.css";

const selector = (id) => (store) => ({
  setInputVal: (e) => store.updateNode(id, { inputVal: e.target.value }),
  setType: (e) => store.updateNode(id, { type: e.target.value }),
});

const Console = ({ id }) => {
  const { setInputVal } = useStore(selector(id), shallow);

  const [consoleVal, setConsoleVal] = useState("");

  const handleConsole = () => {
    console.log(consoleVal);
  };

  return (
    <div className="node-wrapper console-node-wrapper">
      <div className="node-component console-component">
        <p>Console Node</p>
        <label>
          <span>Enter</span>
          <input
            className="nodrag"
            type="text"
            value={consoleVal}
            onChange={(e) => {
              setInputVal(e);
              setConsoleVal(e.target.value);
            }}
          />
        </label>
        <button onClick={handleConsole}>Print value</button>
      </div>
      <Handle type="target" position="top" isConnectable={true} id="b" />
      <Handle type="source" position="bottom" isConnectable={true} id="a" />
    </div>
  );
};

export default Console;
