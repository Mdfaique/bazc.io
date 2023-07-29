import React, { useRef  } from "react";
import "./style.css";
import { useStore } from "../../store";
import Button from "../Button";

const BottomBar = () => {
  const deleteAllNodesAndData = useStore(
    (state) => state.deleteAllNodesAndData
  );
  const store = useStore();
  const actionsExecutedRef = useRef([]);
  const handleExecute = () => {

    function actionBody(nodeData) {
      const currentSubType = nodeData.sub_type;

      // Check if the currentSubType is present in actionsExecutedRef.current
      if (actionsExecutedRef.current.includes(currentSubType)) {
        return null; // or return any other appropriate value
      }

      // Add the currentSubType to actionsExecutedRef.current directly
      actionsExecutedRef.current.push(currentSubType);

      if (!nodeData || nodeData.block_type !== "action") return;

      return nodeData?.function_body;
    }

    function formatFunctionString(nodeData) {
      if (!nodeData) return "";

      if (nodeData.sub_type === "variable") {
        return `${"     "}let ${nodeData.user_defined_name} = ${
          nodeData.input_value[0].selected_variable ?? nodeData.input_value[0].value
        };`;
      }

      if (nodeData.block_type === "action") {
        const inputVals = nodeData.input_value.map((input)=>input.selected_variable ?? input.value);
        return `
            ${nodeData.return ? `let ${nodeData.user_defined_name} = ${nodeData?.sub_type}(${inputVals.join(', ')});`: `${nodeData?.sub_type}(${inputVals.join(', ')});` }`;
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
