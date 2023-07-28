import React from "react";
import "./style.css";
import { useStore } from "../../store";
import Button from "../Button";

const NodeButton = (props) => {
    const createNode = useStore((state) => state.createNode);

    const handleNodeCreation = (nodeType) => {
    createNode(nodeType);
    };

    return (
        <div className="node-button-wrapper">
            <Button onClick={()=> handleNodeCreation(props.name)} name={props.name} />
        </div>
    )
}

export default NodeButton;