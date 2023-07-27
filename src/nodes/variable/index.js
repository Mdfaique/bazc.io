import React, { useEffect, useState } from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import "./style.css";
import DeleteNodeButton from "../../component/DeleteNodeButton/DeleteNodeButton";
import Dropdown from "../../component/Dropdown";

const VariablePopup = (props) => {
  const {id,variableName,setVariableName,setPopupVisible,variableVal,setVariableVal,displayVal,setDisplayVal} = props;

  const [variableExists, setVariableExists] = useState(false);
  
  const data = {
    block_type: "flow_control",
    sub_type: "variable",
    user_defined_name: variableName,
    system_defined_name: `steps.${variableName}.input`,
    selected_value: displayVal,
    input_value: variableVal,
    output_value: null,
    return: false
    }
  const selector = (id) => (store) => ({
    setInputVal: (e) => store.updateNode(id, data),
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

    const variableExists = store?.nodes?.some(
      (node) => node?.data?.user_defined_name === newName && node.id !== id
    );

    setVariableExists(variableExists);
  };

  const handleInputChange = (e) => {
    setVariableVal(e.target.value);
    setDisplayVal(undefined);
  };

  const handlePopupClick = () => {
    setPopupVisible(false);
  };

  const handleStoreVariable = (value) => {

      const data = {
        block_type: "flow_control",
        sub_type: "variable",
        user_defined_name: variableName,
        system_defined_name: `steps.${variableName}.input`,
        selected_value: displayVal,
        input_value: value,
        output_value: null,
        return: false
        }

      setInputVal(id, data);

      const nodes = useStore.getState().nodes.map((node) =>
      node.id === id ? { ...node, data } : node
    );

    const edges = useStore.getState().edges;
    useStore.getState().updateNodesAndEdges(nodes, edges);
    setPopupVisible(false);
  };

  const availableVariables = store.nodes?.length > 1 ? store.nodes.filter((node) => (node?.id !== id || (node?.data?.system_defined_name    === undefined) || (node?.data?.system_defined_name === ''))).map((node) => node.data) : [];

  const handleSelectChange = (selectedValue) => {
    setVariableVal(selectedValue?.input_value);
    setDisplayVal(selectedValue?.system_defined_name);
  }

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
            <input
              className="nodrag"
              type="text"
              value={displayVal ?? variableVal}
              placeholder={availableVariables.length ? "Type or select from dropdown" : "Enter value"}
              onChange={handleInputChange}
            />
            {availableVariables.length ? <Dropdown
              options={availableVariables}
              onSelect={handleSelectChange}
            /> : null}
          </div>
        </label>
        <button onClick={handlePopupClick}>Cancel</button>
        {!variableExists && <button onClick={()=>handleStoreVariable(variableVal)}>Save</button>}
        <DeleteNodeButton nodeId={id} />
      </div>
      <Handle type="target" position="top" isConnectable={true} id="var-b" />
      <Handle type="source" position="bottom" isConnectable={true} id="var-a" />
    </div>
  );
};

const Variable = ({ id }) => {
  const storeNodes = useStore((state) => state.nodes, shallow);
  const currentNode = storeNodes.find((node) => node.id === id);

  const [variableName, setVariableName] = useState(currentNode?.data?.user_defined_name || "");
  const [variableVal, setVariableVal] = useState(currentNode?.data?.input_value || "");
  const [displayVal, setDisplayVal] = useState(currentNode?.data?.selected_value || "");
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
      displayVal={displayVal}
      setDisplayVal={setDisplayVal}
      id={id}
    />
  );
};
export default Variable;
