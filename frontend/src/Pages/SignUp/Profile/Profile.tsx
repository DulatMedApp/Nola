import React from "react";
import "./Profile.css";

type Props = {};

const Profile = (props: Props) => {
  return (
    <main>
      <section className="main-cotainer">
        <div className="header-container">
          <div className="signup-progress">
            <div className="col-profile">
              Общие вопросы
              <div className="green-line"></div>
            </div>
            <div className="col-question">
              Личные вопросы <div className="gray-line"></div>
            </div>
            <div className="col-choose-psy">
              Выбор психолога <div className="gray-line"></div>
            </div>
            <div className="col-order-psy">
              Запись и оплата <div className="gray-line"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="b-container">
        <div className="body-container">
          <div className="name-block">
            <span>Как Вас зовут?</span>
            <input type="name"></input>
          </div>
          <div className="age-block">
            <span>Сколько Вам лет</span>
            <input type="name"></input>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
