import React from "react";
import "./Login.css";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { sendSmsCode } from "../../api/sendSMS/sendSMS";

type Props = {};

const Login = () => {
  // const [phone, setPhone] = useState("");
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
      <section className="login-container-main">
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
                  <button>Получить код</button>
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
      </section>
    </main>
  );
};

export default Login;
