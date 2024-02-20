import { ForwardedRef, forwardRef } from "react";
import { OutlinedInput, TextField } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";
import React from "react";

interface PasswordFieldComponentProps {
  label: string;
  // register: UseFormRegisterReturn;
}

const PasswordFieldComponent = forwardRef(
  (
    { label }: PasswordFieldComponentProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return <TextField type={"password"} size="small" fullWidth label={label} />;
  }
);

export default PasswordFieldComponent;
