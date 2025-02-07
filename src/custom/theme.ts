import { extendTheme } from "@mui/joy";

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          solidBg: "linear-gradient(39deg, #fecf59, #fff1cc)", // Gradient nền
          solidHoverBg: "#fecf59", // Màu hover cơ bản
          solidColor: "#000000", // Màu chữ mặc định
        },
      },
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          background: "linear-gradient(39deg, #fecf59, #fff1cc)", // Giữ gradient chính
          color: "#000", // Chữ màu đen
          transition: "0.3s ease-in-out",
          position: "relative",
          fontWeight: "bold", // Cho chữ rõ hơn
          "&:hover": {
            background: "linear-gradient(39deg, #fff1cc, #fecf59)", // Đảo gradient khi hover
            color: "#000", // Đảm bảo chữ vẫn là màu đen khi hover
            boxShadow: "0px 10px 20px 5px rgba(255, 241, 204, 0.6)", // Hiệu ứng ánh sáng mờ xuống dưới
          },
        },
      },
    },
  },
});

export default theme;
