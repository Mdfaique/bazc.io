import React, { useEffect, useState } from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import Node from "../Node";

const NodeDisplay = ({ id }) => {
    const storeNodes = useStore((state) => state.nodes, shallow);
    const currentNode = storeNodes.find((node) => node.id === id);

    const [popupVisible, setPopupVisible] = useState(false);
  
    const handlePopupClick = () => {
      setPopupVisible(true);
    };
  
    return !popupVisible ? (
      <div className="node-box" onClick={handlePopupClick}>
        <p>{currentNode?.data?.sub_type}</p>
        <span>{currentNode?.data?.user_defined_name ?? `New ${currentNode?.data?.sub_type}`}</span>
        <Handle type="target" position="top" isConnectable={true} id="b" />
        <Handle type="source" position="bottom" isConnectable={true} id="a" />
      </div>
    ) : <Node id={id} node={currentNode?.data} setPopup={setPopupVisible}  />;
  };

  export default NodeDisplay;
  