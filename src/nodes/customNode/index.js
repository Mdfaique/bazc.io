import React, { useState } from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
// import "./style.css";
import DeleteNodeButton from "../../component/DeleteNodeButton/DeleteNodeButton";

const VariablePopup = (props) => {
  const {
    id,
    variableName,
    setVariableName,
    setPopupVisible,
    variableVal,
    displayVal,
    inputParametersProp,
    outputParameterProp,
  } = props;

  const [variableExists, setVariableExists] = useState(false);

  const data = {
    block_type: "CustomNode",
    sub_type: "CustomNode",
    user_defined_name: variableName,
    system_defined_name: `steps.${variableName}.input`,
    selected_value: displayVal,
    input_value: variableVal,
    output_value: null,
    return: false,
  };
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

  // State to manage the input parameters as an array
  const [inputParameters, setInputParameters] = useState(inputParametersProp);
  const [outputParameter, setOutputParameter] = useState(outputParameterProp);

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
  const handleInputChange = (index, field, value) => {
    const updatedParams = [...inputParameters];
    updatedParams[index][field] = value;
    setInputParameters(updatedParams);
    // console.log(updatedParams);

    props.onUpdateInputParams(updatedParams);
  };

  const handlePopupClick = () => {
    setPopupVisible(false);
  };

  // Function to handle saving the variable data
  const handleStoreVariable = (value) => {
    const paramsData = inputParameters.map((param) => ({
      name: param.name,
      value: param.value,
    }));

    const data = {
      block_type: "CustomNode",
      sub_type: "CustomNode",
      user_defined_name: variableName,
      system_defined_name: `steps.${variableName}.input`,
      selected_value: displayVal,
      input_value: value,
      output_value: null,
      return: false,
      input_parameters: paramsData,
      output_parameters: outputParameter ? [{ name: outputParameter }] : [],
    };

    setInputVal(id, data);

    const nodes = useStore
      .getState()
      .nodes.map((node) => (node.id === id ? { ...node, data } : node));

    const edges = useStore.getState().edges;
    useStore.getState().updateNodesAndEdges(nodes, edges);
    setPopupVisible(false); // Close the popup after saving
  };

  // Function to add a new input parameter
  const handleAddParameter = () => {
    setInputParameters([...inputParameters, { name: "", value: "" }]);
  };

  // Function to remove an input parameter
  const handleRemoveParameter = (index) => {
    const updatedParams = [...inputParameters];
    updatedParams.splice(index, 1);
    setInputParameters(updatedParams);
    props.onUpdateInputParams(updatedParams); // Update the inputParametersProp whenever inputParameters state changes
  };

  // Function to handle changes in the output parameter value
  const handleOutputParameter = (e) => {
    const newValue = e.target.value;
    setOutputParameter(newValue);

    // Update the node data with the new output parameter value
    const newData = {
      ...data,
      output_value: newValue, // Use "output_value" field to store the output parameter name
    };
    setInputVal(id, newData);
  };

  return (
    <div className="node-wrapper variable-node-wrapper">
      <div className="node-component variable-component">
        <p>Custom Node</p>
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
        {inputParameters.map((param, index) => (
          <div key={index}>
            <label className="input-dropdown-label">
              <span>Input Parameter Name</span>
              <div>
                <input
                  className="nodrag"
                  type="text"
                  value={param.name}
                  placeholder="Enter Name"
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                />
              </div>
              <button onClick={() => handleRemoveParameter(index)}> - </button>
            </label>
          </div>
        ))}
        <button onClick={handleAddParameter}>+</button>
        <span>Output Parameter Name</span>
        <input
          className="nodrag"
          type="text"
          placeholder="Enter output param name"
          value={outputParameter}
          onChange={handleOutputParameter}
        />
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
    currentNode?.data?.user_defined_name || ""
  );
  const [variableVal, setVariableVal] = useState(
    currentNode?.data?.input_value || ""
  );
  const [displayVal, setDisplayVal] = useState(
    currentNode?.data?.selected_value || ""
  );
  const [popupVisible, setPopupVisible] = useState(false);

  // Initialize inputParameters state with existing input parameters
  const [inputParameters, setInputParameters] = useState(() => {
    const existingParams = currentNode?.data?.input_parameters || [];
    return existingParams.length > 0
      ? existingParams
      : [{ name: "", value: "" }];
  });

  // New state variable to hold the output parameter name
  const [outputParameter, setOutputParameter] = useState(
    currentNode?.data?.output_value || ""
  );

  // Function to update input parameters in the CustomNode component
  const handleUpdateInputParams = (params) => {
    setInputParameters(params);
  };

  const handlePopupClick = () => {
    setPopupVisible(true);
    if (
      currentNode?.data?.output_parameters &&
      currentNode.data.output_parameters.length > 0
    ) {
      const val = currentNode.data.output_parameters[0].name || "";
      setOutputParameter(val);
    } else {
      setOutputParameter("");
      console.log("No output_parameters found.");
    }
  };

  return !popupVisible ? (
    <div className="node-box" onClick={handlePopupClick}>
      <p>Custom Node</p>
      <span>{variableName || "New Custom Node"}</span>
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
      inputParametersProp={inputParameters} // Pass the inputParameters to the VariablePopup
      onUpdateInputParams={handleUpdateInputParams} // Pass the callback function to the VariablePopup
      outputParameter={outputParameter} // Pass the output parameter name to the VariablePopup
      outputParameterProp={outputParameter} // Pass the output parameter name as a prop to the VariablePopup
    />
  );
};
export default CustomNode;
