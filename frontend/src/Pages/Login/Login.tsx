import React from "react";
import "./Login.css";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

type Props = {};

const Login = (props: Props) => {
  const [phone, setPhone] = useState("");

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
              <div className="form-send">
                <PhoneInput
                  defaultCountry="kz"
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  className="custom-phone-input"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
