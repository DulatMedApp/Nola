import React from "react";
import { TextField } from "@mui/material";

function ExpandTextField({
  name,
  label,
  ...props
}: {
  name: string;
  label: string;
}) {
  return (
    <TextField
      name={name}
      required
      fullWidth
      //id="firstName"
      label={label}
      multiline
      rows={4}
    />
  );
}

export default ExpandTextField;
