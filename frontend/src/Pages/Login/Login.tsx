import React from "react";
//import "./Login.css";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { sendSmsCode } from "../../api/sendSMS/sendSMS";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "../../styles/theme";
import Container from "@mui/material/Container";
import {
  CssBaseline,
  Grid,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import RowTextField from "../../Components/RegistrationForm/RowTextField";
import { useForm } from "react-hook-form";
import PasswordFieldComponent from "../../Components/RegistrationForm/PasswordFieldComponent";

const Login = () => {
  type Inputs = {
    phone_number: string;
  };

  const { register } = useForm<Inputs>();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await sendSmsCode({
        phone_number: phoneNumber,
      });
      // Отобразить сообщение об успехе
    } catch (error) {
      // Отобразить сообщение об ошибке
    }
  };

  return (
    <main>
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            minHeight: "50vh",
          }}>
          <CssBaseline />
          <Box>
            <Typography variant="h3"> Вход в личный кабинет</Typography>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}>
                <Grid item xs={8}>
                  <RowTextField
                    label="Телефон"
                    register={register("phone_number")}
                  />
                </Grid>
                <Grid item xs={8}>
                  <PasswordFieldComponent label={"Пароль"} />
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </ThemeProvider>
      {/* <section className="login-container-main">
        <div className="login-container">
          <div className="login-verify">
            <div className="login-block">
              <h1>
                Создайте аккаунт <br /> или войдите
              </h1>
              <p>
                Введите ваш номер телефона.
                <br /> Отправим SMS с проверочным кодом
              </p>
              <form className="form-send" onSubmit={handleSubmit}>
                <PhoneInput
                  defaultCountry="kz"
                  value={phoneNumber}
                  onChange={(phone) => setPhoneNumber(phone)}
                  className="custom-phone-input"
                />
                <div className="button-login">
                  <ThemeProvider theme={theme1}>
                    <Button variant="contained" type="submit">
                      Получить код
                    </Button>
                  </ThemeProvider>

                  <p>Вход для психологов</p>

                  <span>
                    Нажимая «Получить код» вы принимаете пользовательское
                    соглашение, даете согласие на обработку персональных данных.
                    Подробнее в Политике.
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default Login;
