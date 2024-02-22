import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#325343",
    },
  },
  typography: {
    fontFamily: ["Overpass", "sans-serif"].join(","),
    fontSize: 14,

    h1: {
      // Настройте здесь желаемые параметры
      color: "#333",
      lineHeight: 1.5,
      margin: "10px 0",
      fontWeight: 700,
      fontSize: "3rem",
      "@media (max-width:600px)": {
        fontSize: "2.3rem",
      },
    },
    h2: {
      // Настройте здесь желаемые параметры
      color: "#333",
      lineHeight: 1.5,
      margin: "10px 0",
      fontWeight: 500,
      fontSize: "2.5rem",
      "@media (max-width:600px)": {
        fontSize: "1.8rem",
      },
    },
    h3: {
      // Настройте здесь желаемые параметры
      color: "#000",
      lineHeight: 1.5,
      margin: "10px 0",
      fontWeight: 300,
      fontSize: "2rem",
      "@media (max-width:600px)": {
        fontSize: "1.3rem",
      },
    },
    h4: {
      // Настройте здесь желаемые параметры
      color: "#333",
      lineHeight: 1.5,
      margin: "10px 0",
      fontWeight: 300,
      fontSize: "25px",
    },
    h5: {
      // Настройте здесь желаемые параметры
      color: "#333",
      lineHeight: 1.5,
      margin: "10px 0",
      fontWeight: 300,
      fontSize: "13px",
    },
    h6: {
      // Настройте здесь желаемые параметры
      color: "#333",
      lineHeight: 1.5,
      margin: "10px 0",
      fontWeight: 400,
      fontSize: "10px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          fontSize: "15px",
          color: "#fff",
          backgroundColor: "#325343", // как вариант #397a4a
        },
      },
    },
  },
});

export default theme;
