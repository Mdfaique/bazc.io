import React from "react";
import { useContext } from "react";
import { SidebarDataContext } from "../../store/SidebarDataContext";
import "./style.css";
import { useStore } from "../../store/store";
import Button from "../Button";

const NodeButton = (props) => {
  const { data } = props;
  const createNode = useStore((state) => state.createNode);

  const { sidebarData, setSidebarData } = useContext(SidebarDataContext);

  const handleNodeCreation = (data) => {
    createNode(data.sub_type, data);
  };

  const handleDelete = () => {
    const updatedData = { ...sidebarData };
    const nodeType = data.block_type;
    const nodes = updatedData[nodeType].filter(
      (node) => node.sub_type !== data.sub_type
    );
    const updatedSidebarData = { ...sidebarData, action: nodes };
    localStorage.setItem("SidebarData", JSON.stringify(updatedSidebarData));
    setSidebarData(updatedSidebarData);
  };

  return (
    <div className="node-button-wrapper">
      {data.custom && <span onClick={handleDelete}>Del</span>}
      <Button onClick={() => handleNodeCreation(data)} name={data.sub_type} />
    </div>
  );
};

export default NodeButton;
