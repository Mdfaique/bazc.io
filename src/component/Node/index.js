import React, { useState } from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store/store";
import Button from "../Button";
import DeleteNodeButton from "../DeleteNodeButton/DeleteNodeButton";
import './style.css';
import InputSelect from "../Input-Select";

const Node = (props) => {
  const { node, setPopup, id } = props;

  const selector = (id) => (store) => ({
    setInputVal: (e) => store.updateNode(id, node),
    setType: (e) => store.updateNode(id, { type: e.target.value }),
    nodes: store.nodes,
  });

  const selector2 = (store) => ({
    nodes: store.nodes,
  });

  const { setInputVal } = useStore(selector(id), shallow);

  const store = useStore(selector2, shallow);

  const [name, setName] = useState(node?.user_defined_name);
  const [inputVals, setInputVals] = useState(node?.input_value);

  const handleInputChange = (index, inputValue) => {
    const updatedInputVals = [...inputVals];
    updatedInputVals[index] = { ...updatedInputVals[index] };
    updatedInputVals[index].value = inputValue;
    setInputVals(updatedInputVals);
  };

  const handleSelectChange = (index, selected) => {
    const updatedInputVals = [...inputVals];
    updatedInputVals[index] = { ...updatedInputVals[index] };
    updatedInputVals[index].selected_value = selected.selectedVar;
    updatedInputVals[index].value = selected.selectedValue;
    updatedInputVals[index].selected_variable = selected.selectedValueVar;
    setInputVals(updatedInputVals);
  };

  const handleOnCancel = () => {
    setPopup(false);
  };

  const nodeReturn = node?.return;
  
  const handleOnSave = () => {
    const data = {
      ...node,
      id,
      input_value: inputVals,
      output_value: null,
      selected_value: null,
      system_defined_name: nodeReturn ? `steps.${name}.output` : `steps.${name}.input`,
      user_defined_name: name,
    };
    setInputVal(id, data);

    const nodes = useStore
      .getState()
      .nodes.map((node) => (node.id === id ? { ...node, data } : node));

    const edges = useStore.getState().edges;
    useStore.getState().updateNodesAndEdges(nodes, edges);

    setPopup(false);
  };

  const noCurrentNode = store?.nodes?.filter((node)=> node?.id !== id)
  const availableOptions = noCurrentNode?.length ? noCurrentNode?.filter((node)=> node?.data?.block_type === 'flowControl' || node?.data?.return).map((node) => node?.data) : [];

  return (
    <div className="node-wrapper">
      <div className="node-subtype">{node?.sub_type}</div>
      {node?.block_type === "flowControl" || node?.return ? (
        <div>
          <label className="node-name">
            Name :
            <input type="name" onChange={(e)=>setName(e.target.value)} value={name} />
          </label>
        </div>
      ) : null}
      {node?.input_value?.map((input, index) => (
        <label className="node-param-input" key={index}>
          {input?.parameter_name}
          <InputSelect
          options={availableOptions}
          handleInputChange={(value) => handleInputChange(index, value)}
          handleSelectChange={(value) => handleSelectChange(index, value)}
          inputValue={input?.value}
          inputSelected={input?.selected_value === null || !input?.selected_value}
          selectedValue={input?.selected_value}
/>
        </label>
      ))}
      <div className="node-buttons-group">
        <Button name="Cancel" onClick={handleOnCancel} />
        <DeleteNodeButton nodeId={id} />
        <Button name="Save" onClick={handleOnSave} />
      </div>
      <Handle type="target" position="top" isConnectable={true} id={`${id}-top`} />
      <Handle type="source" position="bottom" isConnectable={true} id={`${id}-bottom`} />
    </div>
  );
};

export default Node;
