import React from "react";
import "./style.css";
import { useStore } from "../../store";
import Button from "../Button";

const BottomBar = () => {
  const deleteAllNodesAndData = useStore(
    (state) => state.deleteAllNodesAndData
  );
  const store = useStore();

  const handleExecute = () => {
    function actionBody(nodeData) {
      if (!nodeData || nodeData.block_type !== "action") return;
      return nodeData?.function_body;
    }

    function formatFunctionString(nodeData) {
      if (!nodeData) return "";

      if (nodeData.sub_type === "variable") {
        return `${"     "}let ${nodeData.user_defined_name} = ${
          nodeData.input_value[0].value
        };`;
      }

      if (nodeData.block_type === "action" && nodeData.sub_type === "sum") {
        return `
            let ${nodeData.user_defined_name} = sum(${nodeData.input_value[0].value}, ${nodeData.input_value[1].value});
            print(${nodeData.user_defined_name})`;
      }

      return "";
    }

    const validNodes = store.nodes.filter((node) => node?.data); // Filter out nodes without data
    const functionStr = `${validNodes
      .map((node) => actionBody(node?.data))
      .join("\n")}
        function testProgram() {
      ${validNodes.map((node) => formatFunctionString(node?.data)).join("\n")}
      };
      `;

    console.log(functionStr);
  };

  const handleNodesDeletion = () => {
    deleteAllNodesAndData();
  };

  const handleLogNodes = () => {
    console.log("All nodes: ", store.nodes);
  };

  const handleLogEdges = () => {
    console.log("All edges: ", store.edges);
  };

  return (
    <div className="bottom-bar-wrapper">
      <Button onClick={handleNodesDeletion} name="Delete Nodes" className="bottom-bar-button" />
      <Button onClick={handleExecute} name="Execute" className="bottom-bar-button" />
      <Button onClick={handleLogNodes} name="Log Nodes" className="bottom-bar-button" />
      <Button onClick={handleLogEdges} name="Log Edges" className="bottom-bar-button" />
    </div>
  );
};

export default BottomBar;
