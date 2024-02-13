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
    h5: {
      // Настройте здесь желаемые параметры
      color: "#333",
      lineHeight: 1.5,
      margin: "10px 0",
      fontWeight: 300,
      fontSize: "2.5rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 400,
        },
      },
    },
  },
});

export default theme;
