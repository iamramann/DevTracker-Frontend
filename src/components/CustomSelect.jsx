import React, { useState } from "react";
import { Select, Option } from "@material-tailwind/react";
function CustomSelect({
  field,
  form,
  data = [],
  label,
  size = "lg",
  ...props
}) {
  return (
    <Select
      label={label}
      size={size}
      animate={{
        mount: { y: 0 },
        unmount: { y: 25 },
      }}
      {...field}
      {...props}
    >
      {/* <Option value="-1">Not Available</Option> */}
      {data.length > 0 ? (
        data.map(({ id, taskType }) => {
          return (
            <Option key={id} value={id.toString()}>
              {taskType.toUpperCase()}
            </Option>
          );
        })
      ) : (
        <Option value="-1">Not Available</Option>
      )}
    </Select>
  );
}

// export default React.forwardRef(CustomSelect);
export default CustomSelect;
