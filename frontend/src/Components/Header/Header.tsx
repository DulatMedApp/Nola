import React from "react";
import "./Header.css";

type Props = {};

const Header = (props: Props) => {
  return (
    <main>
      <section className="hedaer">
        <div className="header-content">
          <div className="header-logo">
            <a href="#">
              <span></span>
            </a>
          </div>
          <div className="header-menu">
            <ul>
              {" "}
              <li>
                <a href="#">Для психологов</a>
              </li>
              <li>
                <a href="#">О, nola</a>
              </li>
              <li>
                <a href="#">Для бизнеса</a>
              </li>
              <li>
                <a href="#">Контакты</a>
              </li>
            </ul>
          </div>
          <div className="header-buttons">
            <div
              className="login"
              onClick={() => (window.location.href = "/login")}>
              Вход
            </div>
            <div className="psy-choose">Выбрать психолога</div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Header;
