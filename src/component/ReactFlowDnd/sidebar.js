// import React from 'react';

// export default () => {
//   const onDragStart = (event, nodeType) => {
//     event.dataTransfer.setData('application/reactflow', nodeType);
//     event.dataTransfer.effectAllowed = 'move';
//   };

//   return (
//     <aside>
//       <div className="description">You can drag these nodes to the pane on the right.</div>
//       <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
//         Input Node
//       </div>
//       <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
//         Default Node
//       </div>
//       <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
//         Output Node
//       </div>
//     </aside>
//   );
// };

import React, { useState } from 'react';

export default () => {
  const [nodeName, setNodeName] = useState('');
  const [nodeType, setNodeType] = useState('input');
  const [addedNodes, setAddedNodes] = useState([]);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const addNode = () => {
    if (nodeName.trim() !== '') {
      const newNode = {
        name: nodeName,
        type: nodeType,
      };
      setAddedNodes([...addedNodes, newNode]);
      setNodeName('');
    }
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>

      {/* Custom node input */}
      <div className="custom-node-input">
        <input
          type="text"
          placeholder="Node Name"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
        />
        <select value={nodeType} onChange={(e) => setNodeType(e.target.value)}>
          <option value="input">Input</option>
          <option value="default">Default</option>
          <option value="output">Output</option>
        </select>
        <button onClick={addNode}>Add Node</button>
      </div>

      {/* Added nodes list */}
      {addedNodes.map((node, index) => (
        <div key={index} className={`dndnode ${node.type}`} onDragStart={(event) => onDragStart(event, node.type)} draggable>
          {node.name}
        </div>
      ))}
    </aside>
  );
};

