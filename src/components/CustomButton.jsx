import React from "react";
import { Button } from "@material-tailwind/react";

function CustomButton({
  variant = "gradient",
  size = "lg",
  type = "submit",
  color = "blue",
  loading = false,
}) {
  return (
    <Button
      type={type}
      color={color}
      variant={variant}
      size={size}
      fullWidth
      loading={loading}
    >
      Submit
    </Button>
  );
}

export default CustomButton;
