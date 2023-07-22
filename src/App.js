import './App.css';
// import React from 'react';
// // import MindNode from './component/node.component';
// import DnDFlow from './component/ReactFlowDnd';

// function App() {
//   return (
//     <div className="App">
//       {/* <MindNode/> */}
//       <DnDFlow></DnDFlow>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import ReactFlow, { Background, Panel } from 'reactflow';
import { shallow } from 'zustand/shallow';

import { useStore } from './store';
import Console from './nodes/console';

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
};

const App = () => {
  const store = useStore(selector, shallow);

  return (
    <ReactFlow
      nodes={store.nodes}
      nodeTypes={nodeTypes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onEdgesChange={store.onEdgesChange}
      onConnect={store.addEdge}
    >
      <Panel position="top-right">
  <button onClick={() => store.createNode('console')} className='add-console-btn'>Console</button>
</Panel>
      <Background />
    </ReactFlow>
  );
}

export default App;