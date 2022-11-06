import { createTheme } from "@mui/material";

const theme = createTheme({
    breakpoints: {
    values: {
      xs: 0,
      sm:315,
      md: 640,
      lg: 1024,
      xl: 1200,
    },
  },
  });

export default theme;