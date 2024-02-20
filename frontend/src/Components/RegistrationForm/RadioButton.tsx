import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React from "react";
import { ForwardedRef, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface RadioButtonProps {
  name: string;
  register: UseFormRegisterReturn;
}

const RadioButton = forwardRef(
  (
    { name, register }: RadioButtonProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name={name}
        row
        ref={ref}>
        <FormControlLabel
          value="female"
          control={<Radio />}
          label="Женский"
          {...register}
        />
        <FormControlLabel
          value="male"
          control={<Radio />}
          label="Мужской"
          {...register}
        />
      </RadioGroup>
    );
  }
);

// function RadioButton({
//   value,
//   onChange,
//   ...props
// }: {
//   value: string;
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }) {
//   return (
//     <RadioGroup
//       aria-labelledby="demo-controlled-radio-buttons-group"
//       value={value}
//       onChange={onChange}
//       row>
//       <FormControlLabel value="female" control={<Radio />} label="Женский" />
//       <FormControlLabel value="male" control={<Radio />} label="Мужской" />
//     </RadioGroup>
//   );
// }

export default RadioButton;
