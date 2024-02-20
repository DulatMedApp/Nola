import { withEmotionCache } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#325343", // Hex-код для красного цвета
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
      fontWeight: 300,
      fontSize: "10px",
    },
    h2: {
      // Настройте здесь желаемые параметры
      color: "#333",
      lineHeight: 1.5,
      margin: "10px 0",
      fontWeight: 400,
      fontSize: "32px",
    },
    h3: {
      // Настройте здесь желаемые параметры
      color: "#333",
      lineHeight: 1.5,
      margin: "10px 0",
      fontWeight: 400,
      fontSize: "25px",
    },
    h4: {
      // Настройте здесь желаемые параметры
      color: "#333",
      lineHeight: 1.5,
      margin: "10px 0",
      fontWeight: 400,
      fontSize: "25px",
    },
    h5: {
      // Настройте здесь желаемые параметры
      color: "#333",
      lineHeight: 1.5,
      margin: "10px 0",
      fontWeight: 300,
      fontSize: "16px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
  },
});

export default theme;
