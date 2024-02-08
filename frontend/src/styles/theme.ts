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
