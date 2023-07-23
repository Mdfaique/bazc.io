import { applyNodeChanges, applyEdgeChanges } from "reactflow";
import { nanoid } from "nanoid";
import { create } from "zustand";

export const useStore = create((set, get) => ({
  nodes: [
    // { type: 'console',
    //   id: 'a',
    //   position: { x: 0, y: 0 }
    // },
  ],
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

    set({ edges: [edge, ...get().edges] });
  },

  updateNode(id, data) {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  createNode(type) {
    const id = nanoid();

    switch (type) {
      case "console": {
        const position = { x: 100, y: 100 };
        set({ nodes: [...get().nodes, { id, type, position }] });
        break;
      }
      case "variable": {
        const position = { x: 100, y: 100 };
        set({ nodes: [...get().nodes, { id, type, position }] });
        break;
      }
      case "sum": {
        const position = { x: 100, y: 100 };
        set({ nodes: [...get().nodes, { id, type, position }] });
        break;
      }
      default: {
        const position = { x: 100, y: 100 };
        set({ nodes: [...get().nodes, { id, type, position }] });
        break;
      }
    }
  },
}));
