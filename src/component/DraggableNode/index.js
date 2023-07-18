const DraggableNode = ({ nodeType, text }) => {
  const onDragStart = (event) => {
    const data = JSON.stringify({ type: nodeType, text });
    event.dataTransfer.setData('application/reactflow', data);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className={`dndnode ${nodeType}`} onDragStart={onDragStart} draggable>
      {text}
    </div>
  );
};

export default DraggableNode;
