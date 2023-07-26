import "./App.css";
import React from "react";
import ReactFlow, { Background, Panel, MiniMap, Controls } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "./store";
import Console from "./nodes/console";
import Variable from "./nodes/variable";
import Sum from "./nodes/sum";
import CustomNode from "./nodes/testNode/testNode1";

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
  const deleteAllNodesAndData = useStore(
    (state) => state.deleteAllNodesAndData
  );

  const execute = () => {
    let ret=test();
    console.log(
      JSON.stringify(ret, null, 2)
    );
  };

  const test = () => {
    let buff = undefined;
    buff += `function testVariable() {`;
    localStorage.forEach((element) => {
      if (element.type == "variable") {
        buff += `let ${element.name} = ${element.value}; \n`;
      }
      if (element.type == "action") {
        // let steps_sum_output = sum(v1,v2);
        buff += `let ${element.name}=sum(${element.value},${element.value})`
      }
    });

    buff += `}`;
    return buff;
  };

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
          onClick={() => console.log("All nodes : ", store.nodes)}
          className="add-console-btn"
        >
          Nodes
        </button>
        <button
          onClick={() => console.log("All edges : ", store.edges)}
          className="add-console-btn"
        >
          Edges
        </button>
        <button onClick={deleteAllNodesAndData} className="add-console-btn">
          Del All Nodes
        </button>
        <button
          onClick={() => store.createNode("CustomNode")}
          className="add-console-btn"
        >
          Custom Node
        </button>
        <button onClick={() => execute()} className="add-console-btn">
          Execute
        </button>
      </Panel>
      <Controls />
      <MiniMap />
      <Background />
    </ReactFlow>
  );
};

export default App;
