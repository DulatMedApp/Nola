import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import Box from "@mui/material/Box";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Input as BaseInput, InputProps } from "@mui/base/Input";

// Импортируйте флаги стран
import flags from "react-phone-number-input/flags.png";

import Container from "@mui/material/Container";
//import "./Registration.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import ruLocale from "dayjs/locale/ru";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Button,
  CssBaseline,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";

import {
  getPsyWorkTopics,
  PsyWorkTopics,
} from "../../../api/getCatalogs/getPsyWorkTopics";
import { getLanguages, Languages } from "../../../api/getCatalogs/getLanguages";
import {
  getTherapyMethods,
  TherapyMethods,
} from "../../../api/getCatalogs/getTherapyMethods";

import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
  Checkbox,
} from "@mui/material";
import theme from "../../../styles/theme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Paper } from "@mui/material";

type Props = {};

const Registration: React.FC<Props> = () => {
  const [topics, setTopics] = useState<PsyWorkTopics[]>([]);
  const [languages, setLanguages] = useState<Languages[]>([]);
  const [therapy, setTherapy] = useState<TherapyMethods[]>([]);

  //Hook to get Therapy Methods from API

  useEffect(() => {
    const fetchTherapy = async () => {
      try {
        const therapyData = await getTherapyMethods();
        setTherapy(therapyData);
      } catch (error) {
        console.error("Failed to fetch Therapy", error);
      }
    };
    fetchTherapy();
  }, []);

  //Hook to get Languages from Api
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const languagesData = await getLanguages();
        setLanguages(languagesData);
      } catch (error) {
        console.error("Failed to fetch languages", error);
      }
    };
    fetchLanguages();
  }, []);

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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    if (therapy.length > 0) {
      setContactValue(therapy[0].id.toString());
    }
  }, [therapy]);

  const [ContactValue, setContactValue] = useState("");

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setContactValue(event.target.value);
  };
  const [value, setValue] = React.useState("female");

  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChangePhone = (
    value: React.SetStateAction<string>,
    country: any
  ) => {
    console.log(value, country);
    setPhoneNumber(value);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: {
    target: { files: React.SetStateAction<null>[] };
  }) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    // Здесь вы можете выполнить загрузку выбранного файла на сервер или выполнить другие действия с файлом
    console.log(selectedFile);
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
            <Box component="form" noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Имя"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Фамилия"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChangeGender}
                    row>
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Женский"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Мужской"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                  <PhoneInput
                    country={"kz"}
                    value={phoneNumber}
                    onChange={handleChangePhone}
                    inputStyle={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="dob"
                    label="Дата рождения"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>

                <Grid item xs={12}>
                  <h5>На каких языках Вы ведете сессию? </h5>
                  {languages.map((language, index) => (
                    <Grid item xs={12} key={index}>
                      <FormControlLabel
                        control={<Checkbox className="topics-checkbox" />}
                        label={language.name}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="email"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="recommendation"
                    label="Откуда Вы о нас узнали?"
                    name="recommendation"
                    autoComplete=""
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="experience"
                    label="Сколько лет у Вас опыта?"
                    name="experience"
                    autoComplete=""
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="community"
                    label="Состоите ли Вы в каком-нибудь обществе?"
                    name="community"
                    autoComplete=""
                  />
                </Grid>

                <Grid item xs={12}>
                  <h5>Ваш основной метод: </h5>

                  <Select
                    labelId="Contact Select"
                    id="demo-simple-select"
                    value={ContactValue}
                    label="Select Contact"
                    onChange={handleChange}>
                    {therapy.map((data) => {
                      return (
                        <MenuItem key={data.id} value={data.id}>
                          {data.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="community"
                    label="Расскажите о себе, для клиентов"
                    name="community"
                    autoComplete=""
                    multiline
                    rows={4} // Установите желаемое количество строк
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete=""
                    name="sessionDuration"
                    required
                    fullWidth
                    id="sessionDuration"
                    label="Длительность сессии (минуты)"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="constSession"
                    label="Стоимость сессии (тенге)"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <input
                    accept="image/*"
                    //className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span">
                      Upload
                    </Button>
                  </label>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="education"
                    label="Напишите о Вашем образовании"
                    name="education"
                    autoComplete=""
                    multiline
                    rows={4} // Установите желаемое количество строк
                  />
                </Grid>

                <Grid item xs={12}>
                  <h5>Выберите темы с которыми вы работаете: </h5>
                  {topics.map((topics, index) => (
                    <Grid item xs={12} key={index}>
                      <FormControlLabel
                        control={<Checkbox className="topics-checkbox" />}
                        label={topics.name}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </main>
  );
};

export default Registration;
