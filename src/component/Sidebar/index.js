import React, { useState } from "react";
import SidebarData from "../../data/sidebar";
import NodeButton from "../Node-Button";
import './style.css'
import Button from "../Button";

const Sidebar = () => {

  return (
    <div className="sidebar-wrapper">
    <div className="upper-sidebar">
      <div className="sidebar-title">Flow Controls</div>
      <div className="sidebar-content">
      {SidebarData.flowControl.map((node) => <NodeButton name={node.sub_type} />)}
      </div>
    </div>
    <div className="lower-sidebar">
    <div className="sidebar-title">Actions</div>
    <div className="sidebar-content">
      {SidebarData.action.map((node) => <NodeButton name={node.sub_type} />)}
      <Button name="Add new action" />
    </div>
    </div>
  </div>
  )
};

export default Sidebar;
