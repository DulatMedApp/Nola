import React from "react";
import Button from "@mui/material/Button";
import { ForwardedRef, forwardRef } from "react";

interface ButtonComponentProps {
  label: string;
}

const ButtonComponent = forwardRef(
  ({ label }: ButtonComponentProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <Button variant="contained" fullWidth component="button">
        {label}
      </Button>
    );
  }
);

export default ButtonComponent;
