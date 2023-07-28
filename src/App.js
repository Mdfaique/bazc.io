import "./App.css";
import React from "react";
import ReactFlow, { Background, MiniMap, Controls } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "./store";
import Console from "./nodes/console";
import Variable from "./nodes/variable";
import Sum from "./nodes/sum";
import CustomNode from "./nodes/customNode";
import Sidebar from "./component/Sidebar";
import BottomBar from "./component/Bottom-Bar";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  createNode: store.createNode,
});

const nodeTypes = {
  console: Console,
  variable: Variable,
  sum: Sum,
  CustomNode: CustomNode,
};

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
