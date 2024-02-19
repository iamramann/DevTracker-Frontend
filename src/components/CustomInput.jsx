import React from "react";
import { Input } from "@material-tailwind/react";
function CustomInput({ color = "blue", field, form, error, ...props }) {
  return (
    <div>
      {" "}
      <Input
        // color={errors.title ? "red" : "blue"}
        size="lg"
        color={color}
        error={error}
        {...field}
        {...props}
      />
    </div>
  );
}

export default CustomInput;
