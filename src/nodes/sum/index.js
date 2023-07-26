import React, { useState } from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import "./style.css";
import DeleteNodeButton from "../../component/DeleteNodeButton/DeleteNodeButton";
import Dropdown from "../../component/Dropdown";

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

  const selector = (id) => (store) => ({
    setInputVal: (e) => store.updateNode(id, {name: sumName, params: {value1: variable1, value2: variable2}, value: sum(variable1, variable2), type: 'output' }),
    setType: (e) => store.updateNode(id, { type: e.target.value }),
  });
  
  const selector2 = (store) => ({
    nodes: store.nodes,
  });

  const store = useStore(selector2, shallow);

  const { setInputVal } = useStore(selector(id), shallow);
  const [sumExists, setSumExists] = useState(false);

  // const findVariableValue = (variableName) => {
  //   for (const node of store?.nodes) {
  //     if (node?.data?.name === variableName
  //     ) {
  //       return Number(node?.data?.value);
  //     }
  //   }
  //   return null;
  // };
  
  // const isNumericValue = (value) => {
  //   const numericRegex = /^[0-9]+$/;
  //   return numericRegex.test(value);
  // };
  
  const sum = (var1, var2) => {
    // if (!var1 || !var2) return;
    // const param1 = isNumericValue(var1) ? Number(var1) : findVariableValue(var1);
    // const param2 = isNumericValue(var2) ? Number(var2) : findVariableValue(var2);
    return Number(var1) + Number(var2);
  };

    const handleNameChange = (e) => {
    const newName = e.target.value;
    setSumName(newName);

    const sumExists = store?.nodes?.some(
      (node) => node?.data?.name === newName && node.id !== id
    );
    setSumExists(sumExists);
  };

  const handlePopupClick = () => {
    setPopupVisible(false);
  };

  const handleStoreSum = () => {
    setInputVal(id, { name: sumName, params: {value1: variable1, value2: variable2}, value: sum(variable1, variable2), type: 'output' } );

      const nodes = useStore.getState().nodes.map((node) =>
      node.id === id ? { ...node, data: { ...node.data, name: sumName, params: {value1: variable1, value2: variable2}, value: sum(variable1, variable2), type: 'output' } } : node
    );

    const edges = useStore.getState().edges;

    useStore.getState().updateNodesAndEdges(nodes, edges);
    setPopupVisible(false); // Close the popup after saving
  };

  const availableOptions = store.nodes?.length > 1 ? store.nodes.filter((node) => node?.id !== id).map((node) => ({
    name: node?.data?.name,
    value: node?.data?.value,
    type: node?.data?.type
  })) : [];

  const handleSelectChange1 = (selectedValue1) => {
    setVariable1(selectedValue1);
  }

  const handleSelectChange2 = (selectedValue2) => {
    setVariable2(selectedValue2);
  }

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
            onChange={handleNameChange}
          />
          {sumExists && (
            <span style={{ color: "red" }}>
              Sum name already exists. Please choose another name.
            </span>
          )}
        </label>
        <label className="input-dropdown-label">
          <span>Input value 1</span>
          <input
            className="nodrag"
            type="text"
            placeholder="{{input:data1}}"
            value={variable1}
            onChange={(e) => {
              setVariable1(e.target.value);
            }}
          />
          <Dropdown
              options={availableOptions}
              onSelect={handleSelectChange1}
            />
        </label>
        <label className="input-dropdown-label">
          <span>Input value 2</span>
          <input
            className="nodrag"
            type="text"
            placeholder="{{input:data2}}"
            value={variable2}
            onChange={(e) => {
              setVariable2(e.target.value);
            }}
          />
          <Dropdown
              options={availableOptions}
              onSelect={handleSelectChange2}
            />
        </label>
        <button onClick={handlePopupClick}>Cancel</button>
        {!sumExists && <button onClick={handleStoreSum}>Save</button>}
        <DeleteNodeButton nodeId={id} />
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
      <Handle type="target" position="top" isConnectable={true} id="b" />
      <Handle type="source" position="bottom" isConnectable={true} id="a" />
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
