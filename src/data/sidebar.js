const SidebarData = {
  flowControl: [
    {
      block_type: "flowControl",
      sub_type: "variable",
      total_inputs: 1,
      input_value: [
        {
          value: null,
          system_defined_name: null,
          selected_value: null,
          selected_variable: undefined,
          parameter_name: "var_1",
        },
      ],
      output_value: null, //undefined or not available
      return: false,
      selected_value: null,
      system_defined_name: null,
      user_defined_name: null,
      custom: false
    },
  ],
  action: [
    {
      block_type: "action",
      sub_type: "sum",
      total_inputs: 2,
      input_value: [
        {
          value: null,
          system_defined_name: null,
          selected_value: null,
          selected_variable: undefined,
          parameter_name: "input_1",
        },
        {
          value: null,
          system_defined_name: null,
          selected_value: null,
          selected_variable: null,
          parameter_name: "input_2",
        },
      ],
      function_body: `function sum(input_1, input_2) {
        return ( input_1 + input2 );
      }`,
      output_value: null,
      return: true,
      system_defined_name: null,
      user_defined_name: null,
      custom: false
    },
    {
      block_type: "action",
      sub_type: "print",
      total_inputs: 1,
      input_value: [
        {
          value: null,
          system_defined_name: null,
          selected_value: null,
          selected_variable: undefined,
          parameter_name: "msg",
        },
      ],
      function_body: `function print(msg) {
        console.log(msg);
      }`,
      output_value: null,
      return: false,
      system_defined_name: null,
      user_defined_name: null,
      custom: false
    },
  ],
};
export default SidebarData;
