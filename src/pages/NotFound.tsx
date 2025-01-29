import { Box, Button, Typography } from "@mui/joy";
import notFoundImg from "../images/notfound.png";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "64px",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Box
        sx={{
          width: {
            xs: "330px",
            md: "580px",
          },
          height: {
            xs: "160px",
            md: "280px",
          },
          backgroundImage: `url(${notFoundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <Typography color="neutral" sx={{ textAlign: "center" }} level="h4">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại!
        </Typography>
        <Button onClick={() => navigate("/")} variant="soft">
          Trở về trang chủ
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
