import React from "react";
import { TextField } from "@mui/material";

function RowTextField({
  name,
  label,
  ...props
}: {
  name: string;
  label: string;
}) {
  return (
    <TextField
      autoComplete="given-name"
      name={name}
      required
      fullWidth
      //id="firstName"
      label={label}
      //autoFocus
    />
  );
}

export default RowTextField;
