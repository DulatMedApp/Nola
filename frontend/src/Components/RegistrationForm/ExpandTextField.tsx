import { ForwardedRef, forwardRef } from "react";
import { TextField } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

interface ExpandTextFieldProps {
  label: string;
  register: UseFormRegisterReturn;
}

const ExpandTextField = forwardRef(
  (
    { label, register }: ExpandTextFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <TextField
        multiline
        rows={4}
        fullWidth
        inputRef={ref}
        {...register}
        label={label}
      />
    );
  }
);

export default ExpandTextField;

// function ExpandTextField({
//   name,
//   label,
//   ...props
// }: {
//   name: string;
//   label: string;
// }) {
//   return (
//     <TextField
//       name={name}
//       required
//       fullWidth
//       //id="firstName"
//       label={label}
//       multiline
//       rows={4}
//     />
//   );
// }
