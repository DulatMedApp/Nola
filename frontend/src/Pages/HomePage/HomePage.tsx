import React from "react";
import "./HomePage.css";

type Props = {};

const Home = (props: Props) => {
  return (
    <main>
      <section className="home-wrapper-green-main">
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
        <div className="wrapper-bottom">
          <div className="down-arrow"></div>
        </div>
      </section>

      <section className="home-wrapper-numbers">
        <div className="container-numbers">
          <div className="container-numbers-blocks">
            <h2>
              Портал по поиску психологов.
              <br />
              <span>100% онлайн</span>.
            </h2>
            <div className="container-number-blocks-counters">
              <div className="container-counter-first">
                <p>10,257,896</p>
                <br />
                <span>Сообщений, чатов, видео сессии</span>
              </div>
              <div className="container-counter-first">
                <p>Более 200</p>
                <br />
                <span>Психологов готовы Вам помочь</span>
              </div>
              <div className="container-counter-first">
                <p>Более 5,000</p>
                <br />
                <span>Человек получили поддержку</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="top-curved"></div>

      <section className="professional-features">
        <div className="features-container">
          <h2>
            Профессионалы и психологи, которым Вы можете доверят
            <span>
              Подключитесь к крупнейшей в мире сети дипломированных и опытных
              терапевтов, которые могут помочь вам с целым рядом проблем,
              включая депрессию, тревогу, отношения, травмы, горе и многое
              другое. С нашими терапевтами вы получаете тот же профессионализм и
              качество, которое вы ожидаете от стационарного терапевта, но с
              возможностью общаться, когда и как вы хотите.
            </span>
          </h2>
          <div className="professional-collage">
            <div className="left-column">
              <div className="left-photo-1"></div>
              <div className="left-photo-2"></div>
              <div className="left-photo-3"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="devide-right">
        <div className="devide-right"></div>
      </section>
      <section className="how-it-works">
        <div className="how-container">
          <h2>Как мы работаем</h2>
          <div className="how-it-works-card1">
            <div className="card1-img"></div>
            <div className="card1-text-b">
              <h2>
                Найдем лучшего <br /> психолога для Вас
              </h2>
              <p>
                Ответьте на несколько вопросов, чтобы найти дипломированного
                терапевта, который соответствует вашим потребностям и
                предпочтениям. Подключитесь к крупнейшей сети проверенных
                поставщиков.
              </p>
            </div>
          </div>
          <div className="down-arrow-class">
            <div className="arrow-down-img"></div>
          </div>

          <div className="how-it-works-card2">
            <div className="card2-img"></div>
            <div className="card2-text-b">
              <h2>Коммуницируйте как удобно</h2>
              <p>
                Поговорите со своим психологом так, как вам удобно: текстовое
                сообщение, чат, телефон или видео.
              </p>
            </div>
          </div>
          <div className="down-arrow-class">
            <div className="arrow-down-img"></div>
          </div>
          <div className="how-it-works-card3">
            <div className="card3-img"></div>
            <div className="card3-text-b">
              <h2>В любой удобное время для Вас</h2>
              <p>
                Вы можете написать своему психологу в любое время и из любого
                места. Вы также можете планировать сеансы в реальном времени,
                когда вам удобно, и можете подключаться с любого мобильного
                устройства или компьютера.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews">
        <div className="reviews1"></div>
        <div className="reviews-container"></div>
      </section>
    </main>
  );
};

export default Home;
