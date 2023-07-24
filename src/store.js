// import { applyNodeChanges, applyEdgeChanges } from "reactflow";
// import { nanoid } from "nanoid";
// import { create } from "zustand";

// export const useStore = create((set, get) => ({
//   nodes: [
//     // { type: 'console',
//     //   id: 'a',
//     //   position: { x: 0, y: 0 }
//     // },
//   ],
//   edges: [],

//   onNodesChange(changes) {
//     set({
//       nodes: applyNodeChanges(changes, get().nodes),
//     });
//   },

//   onEdgesChange(changes) {
//     set({
//       edges: applyEdgeChanges(changes, get().edges),
//     });
//   },

//   addEdge(data) {
//     const id = nanoid(6);
//     const edge = { id, ...data };

//     set({ edges: [edge, ...get().edges] });
//   },

//   updateNode(id, data) {
//     set({
//       nodes: get().nodes.map((node) =>
//         node.id === id ? { ...node, data: { ...node.data, ...data } } : node
//       ),
//     });
//   },

//   createNode(type) {
//     const id = nanoid();

//     switch (type) {
//       case "console": {
//         const position = { x: 100, y: 100 };
//         set({ nodes: [...get().nodes, { id, type, position }] });
//         break;
//       }
//       case "variable": {
//         const position = { x: 100, y: 100 };
//         set({ nodes: [...get().nodes, { id, type, position }] });
//         break;
//       }
//       case "sum": {
//         const position = { x: 100, y: 100 };
//         set({ nodes: [...get().nodes, { id, type, position }] });
//         break;
//       }
//       default: {
//         const position = { x: 100, y: 100 };
//         set({ nodes: [...get().nodes, { id, type, position }] });
//         break;
//       }
//     }
//   },
// }));

import { applyNodeChanges, applyEdgeChanges } from "reactflow";
import { nanoid } from "nanoid";
import { create } from "zustand";
import allNodesData from "./allNodesData";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addEdge(data) {
    const id = nanoid(6);
    const edge = { id, ...data };

    set({ edges: [...get().edges, edge] });
  },

  updateNode(id, data) {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  connectNodes(sourceId, targetId) {
    const id = nanoid(6);
    const edge = { id, source: sourceId, target: targetId };

    set({ edges: [...get().edges, edge] });
  },

  createNode(type) {
    const id = nanoid();
    const position = { x: 100, y: 100 };
    const newNode = { id, type, position };

    set({ nodes: [...get().nodes, newNode] });

    // Automatically connect nodes when a new node is added
    const nodesLength = get().nodes.length;
    if (nodesLength > 1) {
      const prevNodeId = get().nodes[nodesLength - 2].id;
      const newNodeId = get().nodes[nodesLength - 1].id;
      get().connectNodes(prevNodeId, newNodeId);
    }
  },

  //   deleteNode(nodeId) {
  //   // Find the node to be deleted
  //   const deletedNode = get().nodes.find((node) => node.id === nodeId);
  //   console.log("deletedNode",deletedNode)

  //   // Filter out the node to be deleted from the nodes array
  //   const filteredNodes = get().nodes.filter((node) => node.id !== nodeId);
  //   console.log("filteredNodes",filteredNodes)

  //   // Filter out edges connected to the node being deleted
  //   const filteredEdges = get().edges.filter(
  //     (edge) => edge.source !== nodeId && edge.target !== nodeId
  //   );
  //   console.log("filteredEdges",filteredEdges)

  //   set({ nodes: filteredNodes, edges: filteredEdges });

  //   // Find the node below the deleted node (if it exists)
  //   const belowNode = get().nodes.find(
  //     (node) => node.position.y > deletedNode.position.y
  //   );
  //   console.log("belowNode",belowNode)

  //   // Find the node above the deleted node (if it exists)
  //   const aboveNode = get().nodes.find(
  //     (node) => node.position.y < deletedNode.position.y
  //   );
  //   console.log("aboveNode",aboveNode)

  //   // Connect the remaining nodes based on their positions
  //   if (belowNode && aboveNode) {
  //     get().addEdge({ source: aboveNode.id, target: belowNode.id });
  //     console.log("belowNode && aboveNode ture")
  //   }

  //   // Find the index of the node in allNodesData
  //   const nodeIndex = allNodesData.findIndex((node) => node.id === nodeId);

  //   // If the node exists in allNodesData, remove it
  //   if (nodeIndex !== -1) {
  //     allNodesData.splice(nodeIndex, 1);
  //   }
  // },

   deleteNode(nodeId) {
    // Find the node to be deleted
    // const deletedNode = get().nodes.find((node) => node.id === nodeId);
    // console.log("deletedNode", deletedNode);
  
    // Find the node below the deleted node (if it exists)
    const belowEdge = get().edges.find(
      (edge) => edge.source === nodeId && edge.target !== nodeId
    );
    const belowNode = belowEdge
      ? get().nodes.find((node) => node.id === belowEdge.target)
      : null;
    // console.log("belowNode", belowNode);
  
    // Find the node above the deleted node (if it exists)
    const aboveEdge = get().edges.find(
      (edge) => edge.target === nodeId && edge.source !== nodeId
    );
    const aboveNode = aboveEdge
      ? get().nodes.find((node) => node.id === aboveEdge.source)
      : null;
    // console.log("aboveNode", aboveNode);
  
    // Connect the remaining nodes based on their positions
    if (belowNode && aboveNode) {
      get().addEdge({ source: aboveNode.id, target: belowNode.id });
      // console.log("belowNode && aboveNode true");
    }
  
    // Filter out edges connected to the node being deleted
    const filteredEdges = get().edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );
    // console.log("filteredEdges", filteredEdges);
  
    // Filter out the node to be deleted from the nodes array
    const filteredNodes = get().nodes.filter((node) => node.id !== nodeId);
    // console.log("filteredNodes", filteredNodes);
  
    set({ nodes: filteredNodes, edges: filteredEdges });
  
    // Find the index of the node in allNodesData
    const nodeIndex = allNodesData.findIndex((node) => node.id === nodeId);
  
    // If the node exists in allNodesData, remove it
    if (nodeIndex !== -1) {
      allNodesData.splice(nodeIndex, 1);
    }
  }
  
}));
