import "./App.css";
import React from "react";
import ReactFlow, { Background, Panel, MiniMap, Controls } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "./store";
import Console from "./nodes/console";
import Variable from "./nodes/variable";
import Sum from "./nodes/sum";
import allNodesData from "./allNodesData";

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
};

const App = () => {
  const store = useStore(selector, shallow);
  const deleteAllNodesAndData = useStore(
    (state) => state.deleteAllNodesAndData
  );

  return (
    <ReactFlow
      nodes={store.nodes}
      nodeTypes={nodeTypes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onEdgesChange={store.onEdgesChange}
      onConnect={store.addEdge}
    >
      <Panel position="top-right" style={{ display: "flex", gap: "5px" }}>
        <button
          onClick={() => store.createNode("console")}
          className="add-console-btn"
        >
          Console
        </button>
        <button
          onClick={() => store.createNode("variable")}
          className="add-console-btn"
        >
          Variable
        </button>
        <button
          onClick={() => store.createNode("sum")}
          className="add-console-btn"
        >
          Sum
        </button>
        <button
          onClick={() => console.log("All nodes data is : ", allNodesData)}
          className="add-console-btn"
        >
          Data
        </button>
        <button onClick={deleteAllNodesAndData} className="add-console-btn">
          Del All Nodes
        </button>
      </Panel>
      <Controls />
      <MiniMap />
      <Background />
    </ReactFlow>
  );
};

export default App;
