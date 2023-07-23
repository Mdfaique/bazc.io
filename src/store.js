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
}));

