import { ForwardedRef, forwardRef } from "react";
import { TextField } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

interface RowTextFieldProps {
  label: string;
  register: UseFormRegisterReturn;
}

const RowTextField = forwardRef(
  (
    { label, register }: RowTextFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <TextField
        autoComplete="given-name"
        //required
        fullWidth
        inputRef={ref}
        {...register} // Регистрируем поле в react-hook-form
        label={label}
        size="small"
      />
    );
  }
);

export default RowTextField;
