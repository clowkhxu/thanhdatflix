import { extendTheme } from "@mui/joy";

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          solidBg: "#1976d2",
          solidHoverBg: "#42a5f5",
        },
        background: {
          body: "#121212",
          surface: "#1e1e1e",
        },
        text: {
          primary: "#ffffff",
          secondary: "#b0bec5",
        },
      },
    },
  },
});

export default theme;
