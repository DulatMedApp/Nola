import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./Registration.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import ruLocale from "dayjs/locale/ru";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  getPsyWorkTopics,
  PsyWorkTopics,
} from "../../../api/getCatalogs/getPsyWorkTopics";

import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
  Checkbox,
} from "@mui/material";

type Props = {};

const Registration: React.FC<Props> = () => {
  const [topics, setTopics] = useState<PsyWorkTopics[]>([]);

  useEffect(() => {
    // Получение данных из API при загрузке компонента
    const fetchTopics = async () => {
      try {
        const topicsData = await getPsyWorkTopics();
        setTopics(topicsData);
      } catch (error) {
        console.error("Failed to fetch work topics:", error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <main>
      <Box>
        <Container maxWidth={false} className="main-container">
          {" "}
          <h1>Сотрудничество с Nola - это</h1>
          <Container className="benefits">
            <text>1. Быстрый набор клиентов.</text>

            <text>
              2. Возможность работать из любого удобного места. Сессии проходят
              онлайн.
            </text>

            <text>
              3. Налаженная система оплаты клиентами, не требующая вашего
              участия. Вы просто получаете деньги на карту за сессии.
            </text>
            <text>
              4. Удобный простой сервис: личный кабинет со списком клиентов,
              расписанием, видеосвязью — все на одной платформе «Ясно».
            </text>
            <text>
              5. Включённость в живое развивающее комьюнити с отобранными
              сильными психотерапевтами. Эксклюзивные вебинары от лучших
              специалистов.
            </text>
            <text>6. Бесплатные групповые супервизии.</text>
          </Container>
          <hr></hr>
          <Container className="fields">
            <FormControl className="psychologist-reg">
              <text>1. Ваше Имя</text>
              <br />
              <TextField
                id="outlined-basic"
                // label="Ваши Фамилия Имя Отчество*"
                variant="outlined"
                size="small"
              />
              <br />
              <text>2. Ваша дата рождения? Число. Месяц. Год.*</text>
              <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label="Basic date picker" />
                </DemoContainer>
              </LocalizationProvider>
              <br />
              <text>
                3. Какое у вас высшее образование? Напишите о базовом
                психологическом (смежном) обучении или переподготовке: 1. Год
                окончания 2. Название ВУЗа 3. Название факультета и специалитета
                4. Укажите академическую степень (бакалавриат, магистратура) или
                ученую степень (если есть).*
              </text>
              <br />
              <span>
                Например, 2003 - МГУ - факультет психологии, клиническая
                психология - бакалавр. <br />
                2010 - ВШЭ - психоанализ - магистерская программа (2 года).
              </span>
              <br />
              <TextField
                id="outlined-multiline-static"
                label="Образование"
                multiline
                rows={4}
                // defaultValue="Default Value"
              />
              <br />
              <text>4. Ваш основной метод?*</text>
              <br />
              {/* Добавляем чекбоксы на основе данных, полученных из API */}
              {topics.map((topic, index) => (
                <FormControl key={index}>
                  <span>{topic.name}</span>
                  <Checkbox />
                </FormControl>
              ))}
            </FormControl>
          </Container>
        </Container>
      </Box>
    </main>
  );
};

export default Registration;
