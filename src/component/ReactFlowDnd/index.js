import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "react-flow-renderer";

import Sidebar from "../Sidebar";

import "./index.css";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "input node" },
    position: { x: 250, y: 5 },
  },
];


let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [inputNodeCount, setInputNodeCount] = useState(1); // Initialize with the count of the initial input node
  const [defaultNodeCount, setDefaultNodeCount] = useState(0);
  const [outputNodeCount, setOutputNodeCount] = useState(0);
  const [conditionalCount, setConditionalNodeCount] = useState(0);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const nodeData = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );

      const type = nodeData.type;
      const value = nodeData?.text;

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      let isConditional = false; // Flag to identify if the dropped node is conditional


      // Get the count and generate the new block name
      let count = 0;
      let blockName = "";
      switch (type) {
        case "input":
          count = inputNodeCount;
          blockName = `input${count}`;
          setInputNodeCount((prevCount) => prevCount + 1);
          break;
        case "default":
          count = defaultNodeCount;
          blockName = `default${count}`;
          setDefaultNodeCount((prevCount) => prevCount + 1);
          break;
        case "output":
          count = outputNodeCount;
          blockName = `output${count}`;
          setOutputNodeCount((prevCount) => prevCount + 1);
          break;
        case "conditional":
          count = conditionalCount;
          blockName = value;
          setConditionalNodeCount((prevCount) => prevCount + 1);

          // For conditional block, create "true" and "false" nodes
          const newNode = {
            id: getId(),
            type,
            position,
            data: { label: `${blockName} node`, value },
          };

          const trueBranchNode = {
            id: getId(),
            type: "default",
            position: { x: position.x + 150, y: position.y },
            data: { label: "True" },
          };

          const falseBranchNode = {
            id: getId(),
            type: "default",
            position: { x: position.x + 150, y: position.y + 100 },
            data: { label: "False" },
          };

          setNodes((nds) =>
            nds.concat(newNode, trueBranchNode, falseBranchNode)
          );

          setEdges((eds) => [
            ...eds,
            { id: getId(), source: newNode.id, target: trueBranchNode.id },
            { id: getId(), source: newNode.id, target: falseBranchNode.id },
          ]);

          break;
        default:
          break;
      }

      // For non-conditional blocks, create only the node without "true" and "false" branches
      if (type !== "conditional") {
        const newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${blockName} node`, value },
        };
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [
      reactFlowInstance,
      inputNodeCount,
      defaultNodeCount,
      outputNodeCount,
      conditionalCount,
    ]
  );

  const handleExecute = () => {
    const inputNodes = nodes.filter((node) => node.type === "input");
    const defaultNodes = nodes.filter((node) => node.type === "default");
    const outputNodes = nodes.filter((node) => node.type === "output");

    const inputNodeConnections = edges
      .filter((edge) => inputNodes.find((node) => node.id === edge.source))
      .map((edge) => {
        const sourceNode = nodes.find((node) => node.id === edge.source);
        const targetNode = nodes.find((node) => node.id === edge.target);
        return `${sourceNode?.data.label} -> ${targetNode?.data.label}`;
      })
      .join(", ");

    const defaultNodeConnections = edges
      .filter((edge) => defaultNodes.find((node) => node.id === edge.source))
      .map((edge) => {
        const sourceNode = nodes.find((node) => node.id === edge.source);
        const targetNode = nodes.find((node) => node.id === edge.target);
        const targetNodeLabel = outputNodes.find(
          (node) => node.id === edge.target
        )
          ? `${targetNode?.data.label}`
          : `${targetNode?.data.label}`;
        return `${sourceNode?.data.label} -> ${targetNodeLabel}`;
      })
      .join(", ");

    const outputNodeConnections = edges
      .filter((edge) => outputNodes.find((node) => node.id === edge.source))
      .map((edge) => {
        const sourceNode = nodes.find((node) => node.id === edge.source);
        const targetNode = nodes.find((node) => node.id === edge.target);
        return `${sourceNode?.data.label} -> ${targetNode?.data.label}`;
      })
      .join(", ");

    console.log(`Number of input nodes: ${inputNodes.length}`);
    console.log(`Input node connections: ${inputNodeConnections}`);
    console.log(`Number of default nodes: ${defaultNodes.length}`);
    console.log(`Default node connections: ${defaultNodeConnections}`);
    console.log(`Number of output nodes: ${outputNodes.length}`);
    console.log(`Output node connections: ${outputNodeConnections}`);

    // Process conditional nodes
    const conditionalNodes = nodes.filter(
      (node) => node.type === "conditional"
    );

    conditionalNodes.forEach((node) => {
      console.log(node);
      const value = node.data.value;
      const result = eval(value);

      console.log(node.data.label, " has out ", result === true);
    });
  };
  return (
    <>
      <div className="dndflow">
        <ReactFlowProvider>
          <div
            className="reactflow-wrapper"
            ref={reactFlowWrapper}
            style={{
              width: "calc(100% - 15rem)",
              height: "600px",
            }}
          >
            <ReactFlow
              className="my-react-flow"
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              <Controls />
            </ReactFlow>
          </div>
          <Sidebar />
          <div></div>
        </ReactFlowProvider>
      </div>
      <button onClick={handleExecute} className="execute-btn">
        Execute
      </button>
    </>
  );
};

export default DnDFlow;
