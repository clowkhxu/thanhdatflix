import { extendTheme } from "@mui/joy";

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          solidBg: "linear-gradient(39deg, #fecf59, #fff1cc)", // Gradient nền
          solidHoverBg: "#fecf59", // Màu hover
          solidColor: "#000000", // Màu chữ đen
        },
        background: {
          body: "#2c2e38", // Giữ nguyên
          surface: "#1e1e1e", // Giữ nguyên
        },
        text: {
          primary: "#ffffff", // Giữ nguyên
          secondary: "#191b24", // Giữ nguyên
        },
      },
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          background: "linear-gradient(39deg, #fecf59, #fff1cc)", // Gradient chính
          color: "#000", // Chữ màu đen
          transition: "0.3s ease-in-out",
          position: "relative",
          fontWeight: "bold",
          "&:hover": {
            background: "linear-gradient(39deg, #fff1cc, #fecf59)", // Đảo gradient khi hover
            color: "#000", // Giữ màu chữ đen
            boxShadow: "0px 10px 20px 5px rgba(255, 241, 204, 0.6)", // Hiệu ứng ánh sáng mờ xuống dưới
          },
        },
      },
    },
  },
});

export default theme;
