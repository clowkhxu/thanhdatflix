import { extendTheme } from "@mui/joy";

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          solidBg: "linear-gradient(39deg, #fecf59, #fff1cc)", // Giữ gradient chính
          solidHoverBg: "#fecf59", // Màu hover cơ bản (vẫn cần)
        },
      },
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          background: "linear-gradient(39deg, #fecf59, #fff1cc)",
          transition: "0.3s ease-in-out",
          "&:hover": {
            background: "linear-gradient(39deg, #fff1cc, #fecf59)", // Đảo ngược màu gradient khi hover
            boxShadow: "0px 0px 15px 5px rgba(255, 241, 204, 0.8)", // Ánh sáng mờ vàng lợt
            filter: "blur(1px)", // Làm hiệu ứng glow nhẹ hơn
          },
        },
      },
    },
  },
});

export default theme;
