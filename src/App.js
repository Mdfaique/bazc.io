import "./App.css";
import React, { useContext } from "react";
import ReactFlow, { Background, MiniMap, Controls } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "./store/store";
import Sidebar from "./component/Sidebar";
import BottomBar from "./component/Bottom-Bar";
import NodeDisplay from "./component/Node-display";
import { SidebarDataContext } from "./store/SidebarDataContext";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  createNode: store.createNode,
});

const App = () => {
  const store = useStore(selector, shallow);
  const { sidebarData } = useContext(SidebarDataContext);

  const updatedNodeTypes = React.useMemo(() => {
    const flowControlNodes = sidebarData.flowControl.map(
      (node) => node.sub_type
    );
    const actionNodes = sidebarData.action.map((node) => node.sub_type);
    const allNodes = [...flowControlNodes, ...actionNodes];

    return allNodes.reduce((acc, node) => {
      acc[node] = NodeDisplay;
      return acc;
    }, {});
  }, [sidebarData]);

  return (
    <>
      <ReactFlow
        nodes={store.nodes}
        nodeTypes={updatedNodeTypes}
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
