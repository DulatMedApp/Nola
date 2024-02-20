import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { ruRU } from "@mui/x-date-pickers/locales";

import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { UseFormRegisterReturn } from "react-hook-form";
import { ForwardedRef, forwardRef, useState } from "react";

interface DatePickerProps {
  label: string;
  register: UseFormRegisterReturn;
  onDateChange: (date: Date | null) => void;
}

const DatePicker = forwardRef(
  (
    { label, register, onDateChange }: DatePickerProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const handleChange = (date: Date | null) => {
      onDateChange(date);
      // Здесь вы можете передать выбранную дату куда-то еще, например, в родительский компонент
    };

    return (
      <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ru">
        <DemoContainer components={["DatePicker"]}>
          <MuiDatePicker
            label="Дата рождения"
            inputRef={ref}
            {...register}
            onChange={handleChange}
          />
        </DemoContainer>
      </LocalizationProvider>
    );
  }
);

// function DatePicker() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ru">
//       <DemoContainer components={["DatePicker"]}>
//         <MuiDatePicker label="Дата рождения" />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }

export default DatePicker;
