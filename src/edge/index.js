import { Handle } from "reactflow";

const Edge = (props) => {
  return (
    <div className="custom-edge">
      <Handle
        type={props.type}
        position={props.position}
        isConnectable={props.isConnectable}
        id={props.id}
      />
    </div>
  );
};

export default Edge;
