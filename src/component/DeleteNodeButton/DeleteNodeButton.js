import React, { useEffect } from "react";
import { useStore } from "../../store/store";
import Button from "../Button";

const DeleteNodeButton = ({ nodeId }) => {
  const deleteNode = useStore((state) => state.deleteNode);

  const handleDelete = () => {
    deleteNode(nodeId);
  };

  useEffect(() => {
    // Add event listener for the "keydown" event
    const handleKeyDown = (event) => {
      // Check if the "Delete" key is pressed (key code: 46)
      if (event.keyCode === 46) {
        handleDelete();
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }); // Add nodeId to the dependency array to ensure the effect runs whenever nodeId changes

  return <Button name=" 🗑️ " onClick={handleDelete} />;
};

export default DeleteNodeButton;
