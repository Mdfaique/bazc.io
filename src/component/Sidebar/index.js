import React, { useState } from "react";
import SidebarData from "../../data/sidebar";
import NodeButton from "../Node-Button";
import './style.css'
import Button from "../Button";
import CustomNode from "../Custom-Node";

const Sidebar = () => {
  const sidebarData = localStorage.getItem("SidebarData")
  ? JSON.parse(localStorage.getItem("SidebarData"))
  : SidebarData;
  const [showCustomNode, setShowCustomNode] = useState(false);
  const handleShowCustom = () => {
    setShowCustomNode(true);
  }

  return (
    <>
    <div className="sidebar-wrapper">
    <div className="upper-sidebar">
      <div className="sidebar-title">Flow Controls</div>
      <div className="sidebar-content">
      {sidebarData.flowControl.map((node) => <NodeButton key={node.sub_type} data={node} />)}
      </div>
    </div>
    <div className="lower-sidebar">
    <div className="sidebar-title">Actions</div>
    <div className="sidebar-content">
      {sidebarData.action.map((node) => <NodeButton key={node.sub_type} data={node} />)}
      <Button name="Add new action" onClick={handleShowCustom} />
    </div>
    </div>
    {showCustomNode && <CustomNode setShowCustomNode={setShowCustomNode} />}
  </div>
  </>
  )
};

export default Sidebar;
