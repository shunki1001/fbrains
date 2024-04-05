import { createTheme } from "@mui/material";

export const fontFamily = [
  "Noto Sans JP",
  "Roboto",
  "Helvetica",
  "Arial",
  "sans-serif",
].join(",");

const theme = createTheme({
  typography: {
    fontFamily: fontFamily,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 315,
      md: 640,
      lg: 1024,
      xl: 1200,
    },
  },
});

export default theme;
