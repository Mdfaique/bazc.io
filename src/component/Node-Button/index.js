import React from "react";
import "./style.css";
import { useStore } from "../../store";
import Button from "../Button";

const NodeButton = (props) => {
    const { data } = props;
    const createNode = useStore((state) => state.createNode);

    const handleNodeCreation = (data) => {
        createNode(data.sub_type, data);
    };

    return (
        <div className="node-button-wrapper">
            <Button onClick={()=> handleNodeCreation(data)} name={data.sub_type} />
        </div>
    )
}

export default NodeButton;