import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { ruRU } from "@mui/x-date-pickers/locales";

import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

function DatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ru">
      <DemoContainer components={["DatePicker"]}>
        <MuiDatePicker label="Дата рождения" />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DatePicker;
