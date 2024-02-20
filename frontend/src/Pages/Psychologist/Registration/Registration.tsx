/* import Components */
import RowTextField from "../../../Components/RegistrationForm/RowTextField";
import React, { useState, useEffect, LegacyRef } from "react";
import Box from "@mui/material/Box";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
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
import { Languages } from "../../../api/getCatalogs/getLanguages";
import PsyMethodWork from "../../../Components/RegistrationForm/PsyMethodWork";
import ExpandTextField from "../../../Components/RegistrationForm/ExpandTextField";
import PsyTopicsWork from "../../../Components/RegistrationForm/PsyTopicsWork";

import { CreatePsychologist } from "../../../api/psychologists/CreatePsychologist";

import { useForm, SubmitHandler } from "react-hook-form";
import { TherapyMethods } from "../../../api/getCatalogs/getTherapyMethods";

// import { TestingApi } from "../../api/TestingApi";

const Registration: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const handleMethodChange = (selectedMethod: string) => {
    setSelectedMethod(selectedMethod);
    console.log(selectedMethod);
  };

  type Inputs = {
    name: string;
    surname: string;
    email: string;
    date_of_birth: string;
    gender: string;
    phone_number: string;
    password: string;
    city: string;
    therapy_method: string;
    about_psychologist: string;
    experience_years: number;
    consultation_cost: number;
    consultation_duration: number;
    community_member: string;
  };

  // const handleChangePhone = (
  //   value: React.SetStateAction<string>,
  //   country: any
  // ) => {
  //   setPhoneNumber(value);
  // };

  /* Gender choose Radio Button */
  const [value, setValue] = React.useState("female");

  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    console.log(formData);
    try {
      await CreatePsychologist(formData); // Update this line to pass the formData object
      alert("Психолог успешно создан");
    } catch (error) {
      alert("Ошибка при создании психолога: " + (error as Error).message);
    }
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
            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    {/* <TextField {...register("name")} fullWidth label="Имя" /> */}
                    <RowTextField
                      label="Имя"
                      register={register("name", { required: true })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <RowTextField
                      label="Фамилия"
                      register={register("surname", { required: true })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <RadioButton
                      name="gender"
                      register={register("gender", { required: true })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* <PhoneInput
                      {...register("phone_number")}
                      country={"kz"}
                      inputStyle={{ width: "100%" }}
                      onChange={() => {
                        // Handle the phone number change here
                      }}
                    /> */}
                  </Grid>
                  <Grid item xs={12}>
                    {/* <LocalizationProvider
                      dateAdapter={AdapterLuxon}
                      adapterLocale="ru">
                      <DemoContainer components={["DatePicker"]}>
                        <MuiDatePicker
                          label="Дата рождения"
                          {...register("date_of_birth")}
                          onChange={(date: any) =>
                            register("date_of_birth").onChange(date)
                          }
                        />
                      </DemoContainer>
                    </LocalizationProvider> */}
                    {/* <DatePicker
                      label="DOB"
                      register={register("date_of_birth")}
                      onDateChange={handleDateChange}
                      //{...register("date_of_birth")}
                    /> */}
                  </Grid>

                  <Grid item xs={12}>
                    <RowTextField
                      label="email"
                      register={register("email", {
                        // required: "Введите email",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "invalid email",
                        },
                      })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                  </Grid>

                  <Grid item xs={12}>
                    <RowTextField
                      label="Из какого Вы города?"
                      register={register("city", {
                        required: true,
                      })}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {/* <RowTextField
                      name="recommendation"
                      label="Откуда Вы о нас узнали"
                    /> */}
                  </Grid>

                  <Grid item xs={12}>
                    <RowTextField
                      label="Сколько лет у Вас опыта?"
                      register={register("experience_years", {
                        required: true,
                      })}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <RowTextField
                      label="Состоите ли Вы в каком-нибудь обществе?"
                      register={register("community_member", {
                        required: true,
                      })}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <h5>Ваш основной метод: </h5>
                    <PsyMethodWork
                      {...register("therapy_method")}
                      onMethodWorksChange={handleMethodChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <ExpandTextField
                      label="Расскажите о себе, для клиентов"
                      register={register("about_psychologist", {
                        required: true,
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <RowTextField
                      label="Длительность сессии(минуты)"
                      register={register("consultation_duration", {
                        required: true,
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <RowTextField
                      label="Стоимость сессии(тенге)"
                      register={register("consultation_cost", {
                        required: true,
                      })}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {/* <h5>Загрузите пожалуйста Вашу фотографию: </h5>
                    <AttachmentUpload /> */}
                  </Grid>

                  <Grid item xs={12}>
                    <h5>Выберите темы с которыми вы работаете: </h5>
                    <PsyTopicsWork
                      onTopicsChange={[value] as unknown as PsyWorkTopics[]}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {/* <h5>Загрузите пожалуйста скан дипломов (если есть): </h5>

                    <AttachmentUpload /> */}
                  </Grid>

                  <Grid item xs={12}>
                    {/* <ExpandTextField
                      label="Напишите ссылки на Ваши социальные сети"
                      register={register("about_psychologist", {
                        required: true,
                      })}
                    /> */}
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
              </form>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </main>
  );
};

export default Registration;
