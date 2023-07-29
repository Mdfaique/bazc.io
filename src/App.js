import "./App.css";
import React, {useState} from "react";
import ReactFlow, { Background, MiniMap, Controls } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "./store";
import Sidebar from "./component/Sidebar";
import BottomBar from "./component/Bottom-Bar";
import SidebarData from "./data/sidebar";
import NodeDisplay from "./component/Node-display";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  createNode: store.createNode,
});

const flowControlNodes = SidebarData.flowControl.map((node) => node.sub_type);
const actionNodes = SidebarData.action.map((node) => node.sub_type);
const allNodes = [...flowControlNodes, ...actionNodes];

const nodeTypes = allNodes.reduce((acc, node) => {
  acc[node] = NodeDisplay;
  return acc;
}, {});

const App = () => {
  const store = useStore(selector, shallow);
  return (
    <>
    <ReactFlow
      nodes={store.nodes}
      nodeTypes={nodeTypes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onEdgesChange={store.onEdgesChange}
      onConnect={store.addEdge}
    >
      <Sidebar />
      <BottomBar />
      <Controls />
      <MiniMap />
      <Background />
    </ReactFlow>
    </>
  );
};

export default App;
