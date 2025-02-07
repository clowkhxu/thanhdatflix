import { extendTheme } from "@mui/joy";

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          solidBg: "linear-gradient(39deg, #fecf59, #fff1cc)", // Giữ gradient chính
          solidHoverBg: "#fecf59", // Màu hover cơ bản
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
          position: "relative", // Đảm bảo shadow hiển thị đúng
          "&:hover": {
            background: "linear-gradient(39deg, #fff1cc, #fecf59)", // Đảo gradient khi hover
            boxShadow: "0px 10px 20px 5px rgba(255, 241, 204, 0.6)", // Hiệu ứng ánh sáng tỏa xuống dưới
          },
        },
      },
    },
  },
});

export default theme;
