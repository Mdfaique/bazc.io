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
    displayVal1,
    setDisplayVal1,
    displayVal2,
    setDisplayVal2,
    selectedValue1,
    setSelectedValue1,
    selectedValue2,
    setSelectedValue2
  } = props;

  const sum = (var1, var2) => {
    // if (!var1 || !var2) return;
    // const param1 = isNumericValue(var1) ? Number(var1) : findVariableValue(var1);
    // const param2 = isNumericValue(var2) ? Number(var2) : findVariableValue(var2);
    return Number(var1) + Number(var2);
  };

  const data = {
    block_type: "action",
    sub_type: "sum",
    user_defined_name: sumName,
    system_defined_name: `steps.${sumName}.output`,
    input_value: [
    {value: variable1,
    system_defined_name: displayVal1 === "" ? `steps.${sumName}.input1` : displayVal1, selected_value: selectedValue1 === "" ? variable1 : selectedValue1, user_defined_name: variable1},
    {value: variable2,
    system_defined_name: displayVal2 === "" ? `steps.${sumName}.input2` : displayVal2, selected_value: selectedValue2 === "" ? variable2 : selectedValue2, user_defined_name: variable2},
    ],
    output_value: sum(variable1, variable2),
    return: true
    }

  const selector = (id) => (store) => ({
    setInputVal: (e) => store.updateNode(id, data),
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

    setInputVal(id, data );

      const nodes = useStore.getState().nodes.map((node) =>
      node.id === id ? { ...node, data } : node
    );

    const edges = useStore.getState().edges;

    useStore.getState().updateNodesAndEdges(nodes, edges);
    setPopupVisible(false); // Close the popup after saving
  };

  const availableVariables = store.nodes?.length > 1 ? store.nodes.filter((node) => (node?.id !== id || (node?.data?.system_defined_name    === undefined) || (node?.data?.system_defined_name === ''))).map((node) => node.data) : [];

  const handleSelectChange1 = (selectedValue1) => {
    setVariable1(selectedValue1?.input_value);
    setDisplayVal1(selectedValue1?.system_defined_name);
    setSelectedValue1(selectedValue1?.user_defined_name);
  }

  const handleSelectChange2 = (selectedValue2) => {
    setVariable2(selectedValue2?.input_value);
    setDisplayVal2(selectedValue2?.system_defined_name);
    setSelectedValue2(selectedValue2?.user_defined_name);
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
            value={displayVal1 === '' ? variable1 : displayVal1}
            onChange={(e) => {
              setVariable1(e.target.value);
            }}
          />
          <Dropdown
              options={availableVariables}
              onSelect={handleSelectChange1}
            />
        </label>
        <label className="input-dropdown-label">
          <span>Input value 2</span>
          <input
            className="nodrag"
            type="text"
            placeholder="{{input:data2}}"
            value={displayVal2 === '' ? variable2 : displayVal2}
            onChange={(e) => {
              setVariable2(e.target.value);
            }}
          />
          <Dropdown
              options={availableVariables}
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

  const storeNodes = useStore((state) => state.nodes, shallow);
  const currentNode = storeNodes.find((node) => node.id === id);

  const [sumName, setSumName] = useState(currentNode?.data?.user_defined_name || "");
  const [variable1, setVariable1] = useState(currentNode?.data?.input_value[0]?.user_defined_name || "");
  const [variable2, setVariable2] = useState(currentNode?.data?.input_value[1]?.user_defined_name || "");
  const [displayVal1, setDisplayVal1] = useState(currentNode?.data?.input_value[0]?.selected_value || "");
  const [displayVal2, setDisplayVal2] = useState(currentNode?.data?.input_value[1]?.selected_value || "");
  const [selectedValue1, setSelectedValue1] = useState(currentNode?.data?.input_value[0]?.selected_value || "");
  const [selectedValue2, setSelectedValue2] = useState(currentNode?.data?.input_value[1]?.selected_value || "");
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
      displayVal1={displayVal1}
      setDisplayVal1={setDisplayVal1}
      displayVal2={displayVal2}
      setDisplayVal2={setDisplayVal2}
      selectedValue1={selectedValue1}
      setSelectedValue1={setSelectedValue1}
      selectedValue2={selectedValue2}
      setSelectedValue2={setSelectedValue2}
    />
  );
};

export default Sum;
