import React from "react";
import { useStore } from "../../store";

const DeleteNodeButton = ({ nodeId }) => {
  const deleteNode = useStore((state) => state.deleteNode);

  const handleDelete = () => {
    deleteNode(nodeId);
  };

  return <button onClick={handleDelete}>Delete Node</button>;
};

export default DeleteNodeButton;
