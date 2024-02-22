import React from "react";
import "./HomePage.css";
import Container from "@mui/material/Container";
import { Box, CssBaseline, Grid, Typography } from "@mui/material";
import CardFullImage from "../../Components/RegistrationForm/CardFullImage";
import theme from "../../styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import * as HomeStyles from "./HomeStyles";

const HomePage = () => {
  return (
    <main>
      <CssBaseline />

      <Container sx={HomeStyles.headerContainerStyles} maxWidth={false}>
        <Container sx={HomeStyles.typeTherapyContainerStyles}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
              <ThemeProvider theme={theme}>
                <Typography
                  variant="h1"
                  sx={{
                    color: "#fff",
                  }}>
                  Вы заслуживаете быть счастливым
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: "#fff",
                  }}>
                  Какой тип терапии вы ищете?
                </Typography>
              </ThemeProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CardFullImage
                label="Для себя"
                backgroundColor="#325343"
                imageSource="https://i.postimg.cc/SQCZqcNr/home-girl.png"
                cardWidth={346}
                cardHeight={NaN}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CardFullImage
                label="Пары"
                backgroundColor="#265353"
                imageSource="https://i.postimg.cc/DyxSHYsb/couples-before.png"
                cardWidth={346}
                cardHeight={NaN}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CardFullImage
                label="Подростки"
                backgroundColor="#6f4205"
                imageSource="https://i.postimg.cc/3RLMYpZ9/teen-before.png"
                cardWidth={346}
                cardHeight={NaN}
              />
            </Grid>
          </Grid>
        </Container>
      </Container>

      <Container sx={HomeStyles.statistikContainerStyles} maxWidth={false}>
        <Container sx={HomeStyles.statistikBoxStyles}>
          <ThemeProvider theme={theme}>
            <Grid
              container
              spacing={4}
              sx={{ justifyContent: "center", alignItems: "center" }}>
              <Grid item xs={12} sm={6} md={6}>
                <Typography variant="h2" sx={{}}>
                  Портал по поиску психологов.
                  <br />
                  <span style={{ color: "#397a4a" }}>100% онлайн</span>.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Typography variant="h2" sx={{ color: "#397a4a" }}>
                  10,257,896
                </Typography>

                <Typography variant="h3" sx={{ fontSize: "1.2rem" }}>
                  Сообщений, чатов, видео сессии
                </Typography>
                <hr style={{ width: "100%", borderTop: "1px solid #000" }} />

                <Typography variant="h2" sx={{ color: "#397a4a" }}>
                  Более 200
                </Typography>
                <Typography variant="h3" sx={{ fontSize: "1.2rem" }}>
                  Психологов готовы Вам помочь
                </Typography>
                <hr style={{ width: "100%", borderTop: "1px solid #000" }} />

                <Typography variant="h2" sx={{ color: "#397a4a" }}>
                  Более 5,000
                </Typography>
                <Typography variant="h3" sx={{ fontSize: "1.2rem" }}>
                  Человек получили поддержку
                </Typography>
              </Grid>
            </Grid>
          </ThemeProvider>
        </Container>
      </Container>

      {/* <section className="home-wrapper-numbers">
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
      </section> */}
    </main>
  );
};

export default HomePage;
