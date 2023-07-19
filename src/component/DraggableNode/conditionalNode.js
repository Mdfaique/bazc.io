import React from 'react';
import DraggableNode from './index';

const ConditionalNode = ({ onDragStart }) => {
  const nodeType = 'conditional';
  const text = 'Conditional Node';

  return (
    <div className="dndnode conditional" onDragStart={(event) => onDragStart(event, nodeType)} draggable>
      <DraggableNode nodeType={nodeType} onDragStart={onDragStart}>
        {text}
      </DraggableNode>
    </div>
  );
};

export default ConditionalNode;
