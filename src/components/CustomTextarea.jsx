import React from "react";
import { Textarea } from "@material-tailwind/react";
function CustomTextarea({ field, form, error, ...props }) {
  return (
    <Textarea
      size="lg"
      label="Description"
      error={error}
      {...field}
      {...props}
    />
  );
}

export default CustomTextarea;
