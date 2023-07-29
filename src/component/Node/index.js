import React from "react";

const Node = (props) => {
    return (
        <div className="node-wrapper">
            <div className="node-subtype">{props.sub_type}</div>
            {props.block_type === 'flowControl' || props.return ? 
            <div>
            <label className="node-name">
                Name :
                <input type="name" />
            </label>
            </div> : null}
            {
                props.input_value?.map((input) => (
                    <label className="node-param-input">
                {input.parameter_name}
                <input type="text" />
            </label>
                ))
            }
            <div className="node-buttons-group">
                
            </div>
        </div>
    )
}

export default Node;