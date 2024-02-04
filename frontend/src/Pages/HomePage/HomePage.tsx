import React from "react";
import "./HomePage.css";

type Props = {};

const Home = (props: Props) => {
  return (
    <main>
      <section className="home-wrapper-green">
        <div className="home-wrapper-green">
          <div className="container-therapy-card">
            <div className="container-cards">
              <h1>Вы заслуживаете быть счастливым.</h1>
              <div className="container-card-list">
                <h2>Какой тип терапии вы ищете?</h2>
                <div className="container-cards-group">
                  <a className="individual-link">
                    <div className="individual-text">Для себя</div>
                  </a>
                  <a className="couples-link">
                    <div className="couples-text">Пары</div>
                  </a>
                  <a className="teen-link">
                    <div className="teen-text">Подростки</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper-bottom"></div>
      </section>
    </main>
  );
};

export default Home;
