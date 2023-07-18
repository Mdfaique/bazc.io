import React, { useState } from "react";
import DraggableNode from "../DraggableNode";

const Sidebar = () => {
  const [showForm, setShowForm] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [nodeType, setNodeType] = useState("");
  const [text, setText] = useState("");

  const handleCreateNode = (event) => {
    event.preventDefault();

    const newNode = {
      id: Date.now().toString(),
      nodeType,
      text,
    };

    setNodes([...nodes, newNode]);
    setNodeType("");
    setText("");
    setShowForm(false);
  };

  return (
    <aside className="sidebar-container">
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <DraggableNode key="1st input node" nodeType="input" text="Input" />
      <DraggableNode key="1st default node" nodeType="default" text="Default" />
      <DraggableNode key="1st output node" nodeType="output" text="Output" />
      {nodes.map((node) => (
        <DraggableNode
          key={node.id}
          nodeType={node.nodeType}
          text={node.text}
        />
      ))}
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="create-node-button">Create Node</button>
      )}
      {showForm && (
        <form onSubmit={handleCreateNode} className="new-node-form">
          <select
            name="nodeType"
            value={nodeType}
            onChange={(event) => setNodeType(event.target.value)}
            required
          >
            <option value="">Select Node Type</option>
            <option value="input">Input</option>
            <option value="output">Output</option>
            <option value="default">Default</option>
            <option value="conditional">Conditional</option>
          </select>
          <input
            type="text"
            name="text"
            placeholder={nodeType === "conditional" ? "Condition" : "Name"}
            value={text}
            onChange={(event) => setText(event.target.value)}
            required
          />
          <button type="submit">Create Node</button>
          <button onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
        </form>
      )}
    </aside>
  );
};

export default Sidebar;
