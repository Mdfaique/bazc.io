import "./App.css";
import React from "react";
import ReactFlow, { Background, MiniMap, Controls } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "./store";
import Console from "./nodes/console";
import Variable from "./nodes/variable";
import Sum from "./nodes/sum";
import CustomNode from "./nodes/customNode";

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

  const handleExecute = () => {
    function formatFunctionString(nodeData, indent = 0) {
      const indentSpaces = " ".repeat(indent * 2);
      if (!nodeData) return "";

      if (nodeData.sub_type === "variable") {
        return `${indentSpaces}let ${nodeData.user_defined_name} = ${nodeData.input_value};`;
      }

      if (nodeData.block_type === "action" && nodeData.sub_type === "sum") {
        return `${indentSpaces}let ${nodeData.user_defined_name} = sum(${nodeData.input_value[0].selected_value}, ${nodeData.input_value[1].selected_value});`;
      }

      return "";
    }

    const validNodes = store.nodes.filter((node) => node?.data); // Filter out nodes without data
    const functionStr = `function() {
  ${validNodes.map((node) => formatFunctionString(node?.data, 1)).join("\n")}
  }`;

    console.log(functionStr);
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
      <div className="panel right-sidebar">
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
        <button onClick={handleExecute} className="add-console-btn">
          Execute
        </button>
        <button
          onClick={() => {
            console.log("Custom clicked");
            store.createNode("CustomNode");
          }}
          className="add-console-btn"
        >
          CustomNode
        </button>
      </div>
      <Controls />
      <MiniMap />
      <Background />
    </ReactFlow>
  );
};

export default App;
