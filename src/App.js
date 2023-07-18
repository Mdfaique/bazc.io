import './App.css';
import React from 'react';
// import MindNode from './component/node.component';
import DnDFlow from './component/ReactFlowDnd';

function App() {
  return (
    <div className="App">
      {/* <MindNode/> */}
      <DnDFlow></DnDFlow>
    </div>
  );
}

export default App;

// import React, { useCallback } from 'react';
// import ReactFlow, {   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
// } from 'react-flow-renderer';


// const initialNodes = [
//   { id: '1', position: { x: 100, y: 0 }, data: { label: '1' } },
//   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
//   { id: '3', position: { x: 50, y: 100 }, data: { label: '3' } },
// ];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

// export default function App() {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  

//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//       >
//         <Controls />
//         <MiniMap />
//         <Background variant="dots" gap={12} size={1} />
//       </ReactFlow>
//     </div>
//   );
// }
