import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { on } from "events";
import React from "react";

function RadioButton({
  name,
  value,
  onChange,
  ...props
}: {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <RadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name={name}
      value={value}
      onChange={onChange}
      row>
      <FormControlLabel value="female" control={<Radio />} label="Женский" />
      <FormControlLabel value="male" control={<Radio />} label="Мужской" />
    </RadioGroup>
  );
}

export default RadioButton;
