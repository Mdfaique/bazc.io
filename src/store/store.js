import { applyNodeChanges, applyEdgeChanges } from "reactflow";
import { nanoid } from "nanoid";
import { create } from "zustand";
import produce from "immer";

export const useStore = create((set, get) => ({
  nodes: localStorage.getItem("nodes")
    ? JSON.parse(localStorage.getItem("nodes"))
    : [],
  edges: localStorage.getItem("edges")
    ? JSON.parse(localStorage.getItem("edges"))
    : [],

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

  updateNodesAndEdges(nodes, edges) {
    set(
      produce((draft) => {
        draft.nodes = nodes;
        draft.edges = edges;
      })
    );
    localStorage.setItem("nodes", JSON.stringify(nodes));
    localStorage.setItem("edges", JSON.stringify(edges));
  },

  connectNodes(sourceId, targetId) {
    const id = nanoid(6);
    const edge = { id, source: sourceId, target: targetId };

    set({ edges: [...get().edges, edge] });
  },

  createNode(type, additionalData) {
    const id = nanoid();
    const nodesLength = get().nodes.length;
    const position = {
      x: 100, // Set the initial x-coordinate for the new node
      y: 100 + nodesLength * 100, // Add a gap of 100px for each node
    };
    const newNode = { id, type, position, data: additionalData };

    set({ nodes: [...get().nodes, newNode] });

    // Automatically connect nodes when a new node is added
    if (nodesLength > 0) {
      const prevNodeId = get().nodes[nodesLength - 1].id;
      const newNodeId = newNode.id;
      get().connectNodes(prevNodeId, newNodeId);
    }
  },

  deleteNode(nodeId) {
    const belowEdge = get().edges.find(
      (edge) => edge.source === nodeId && edge.target !== nodeId
    );
    const belowNode = belowEdge
      ? get().nodes.find((node) => node.id === belowEdge.target)
      : null;

    // Find the node above the deleted node (if it exists)
    const aboveEdge = get().edges.find(
      (edge) => edge.target === nodeId && edge.source !== nodeId
    );
    const aboveNode = aboveEdge
      ? get().nodes.find((node) => node.id === aboveEdge.source)
      : null;

    // Connect the remaining nodes based on their positions
    if (belowNode && aboveNode) {
      get().addEdge({ source: aboveNode.id, target: belowNode.id });
    }

    // Filter out edges connected to the node being deleted
    const filteredEdges = get().edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );

    // Filter out the node to be deleted from the nodes array
    const filteredNodes = get().nodes.filter((node) => node.id !== nodeId);

    // Update the state and localStorage with the filtered nodes and edges
    set({ nodes: filteredNodes, edges: filteredEdges });
    localStorage.setItem("nodes", JSON.stringify(filteredNodes));
    localStorage.setItem("edges", JSON.stringify(filteredEdges));
  },
  loadFromLocalStorage() {
    const savedNodes = localStorage.getItem("nodes");
    const savedEdges = localStorage.getItem("edges");
    if (savedNodes && savedEdges) {
      set({
        nodes: JSON.parse(savedNodes),
        edges: JSON.parse(savedEdges),
      });
    }
  },

  deleteAllNodesAndData() {
    // Clear the nodes and edges arrays
    set({ nodes: [], edges: [] });
    localStorage.setItem("nodes", JSON.stringify([]));
    localStorage.setItem("edges", JSON.stringify([]));
  },
}));

// Call the `loadFromLocalStorage` function on initial load to load the saved nodes and edges
useStore.getState().loadFromLocalStorage();
