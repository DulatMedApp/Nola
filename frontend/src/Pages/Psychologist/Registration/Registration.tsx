/* import Components */
import RowTextField from "../../../Components/RegistrationForm/RowTextField";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import Container from "@mui/material/Container";
//import "./Registration.css";

import {
  Button,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
} from "@mui/material";

import { PsyWorkTopics } from "../../../api/getCatalogs/getPsyWorkTopics";

import { TextField, Checkbox } from "@mui/material";
import theme from "../../../styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import RadioButton from "../../../Components/RegistrationForm/RadioButton";
import LanguageChoose from "../../../Components/RegistrationForm/LanguageChoose";
import { Languages } from "../../../api/getCatalogs/getLanguages";
import PsyMethodWork from "../../../Components/RegistrationForm/PsyMethodWork";
import ExpandTextField from "../../../Components/RegistrationForm/ExpandTextField";
import PsyTopicsWork from "../../../Components/RegistrationForm/PsyTopicsWork";
import DatePicker from "../../../Components/RegistrationForm/DatePicker";

import UploadImages from "../../../Components/RegistrationForm/UploadImages";
import AttachmentUpload from "../../../Components/RegistrationForm/AttachmentUpload";

type Props = {};

const Registration: React.FC<Props> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChangePhone = (
    value: React.SetStateAction<string>,
    country: any
  ) => {
    console.log(value, country);
    setPhoneNumber(value);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: {
    target: { files: React.SetStateAction<null>[] };
  }) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    // Здесь вы можете выполнить загрузку выбранного файла на сервер или выполнить другие действия с файлом
    console.log(selectedFile);
  };

  /* Gender choose Radio Button */
  const [value, setValue] = React.useState("female");

  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <main>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Paper
            sx={{
              marginTop: 8,
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <h2>Давайте работать вместе</h2>
            <br />
            <Box component="form" noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <RowTextField name="firstName" label="Имя" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RowTextField name="secondName" label="Фамилия" />
                </Grid>
                <Grid item xs={12}>
                  <RadioButton
                    name="Gender"
                    value={value}
                    onChange={handleChangeGender}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PhoneInput
                    country={"kz"}
                    value={phoneNumber}
                    onChange={handleChangePhone}
                    inputStyle={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DatePicker />
                </Grid>

                <Grid item xs={12}>
                  <RowTextField name="email" label="email" />
                </Grid>

                <Grid item xs={12}>
                  <RowTextField
                    name="recommendation"
                    label="Откуда Вы о нас узнали"
                  />
                </Grid>

                <Grid item xs={12}>
                  <RowTextField
                    name="experience"
                    label="Сколько лет у Вас опыта?"
                  />
                </Grid>

                <Grid item xs={12}>
                  <RowTextField
                    name="community"
                    label="Состоите ли Вы в каком-нибудь обществе?"
                  />
                </Grid>

                <Grid item xs={12}>
                  <h5>Ваш основной метод: </h5>

                  <PsyMethodWork
                    onMethodWorksChange={[value] as unknown as Languages[]}
                  />
                </Grid>

                <Grid item xs={12}>
                  <ExpandTextField
                    name="aboutPsy"
                    label="Расскажите о себе, для клиентов"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RowTextField
                    name="durationSession"
                    label="Длительность сессии(минуты)"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RowTextField
                    name="costSession"
                    label="Стоимость сессии(тенге)"
                  />
                </Grid>

                <Grid item xs={12}>
                  <h5>Загрузите пожалуйста Вашу фотографию: </h5>
                  {/* <input
                    accept="image/*"
                    //className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span">
                      Upload
                    </Button>
                  </label> */}
                  <UploadImages />
                </Grid>

                <Grid item xs={12}>
                  <ExpandTextField
                    name="aboutPsy"
                    label="Напишите о Вашем образовании"
                  />
                </Grid>

                <Grid item xs={12}>
                  <h5>Выберите темы с которыми вы работаете: </h5>
                  <PsyTopicsWork
                    onTopicsChange={[value] as unknown as PsyWorkTopics[]}
                  />
                </Grid>

                <Grid item xs={12}>
                  <h5>Загрузите пожалуйста скан дипломов (если есть): </h5>

                  <AttachmentUpload />
                </Grid>

                <Grid item xs={12}>
                  <ExpandTextField
                    name="psySocialLinks"
                    label="Напишите ссылки на Ваши социальные сети"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Зарегистрироваться
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="Нажимая «Зарегистрироваться» вы принимаете пользовательское
                     соглашение, даете согласие на обработку персональных данных. 
                     Подробнее в Политике."
                    sx={{ fontSize: "10.5rem" }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Уже есть аккаунт? Вход в систему
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </main>
  );
};

export default Registration;
