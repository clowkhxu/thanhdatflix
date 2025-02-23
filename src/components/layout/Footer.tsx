import { Box, Grid, Typography } from "@mui/joy";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const Footer = () => {
  const theme = useSelector((state: RootState) => state.system.theme);

  return (
    <Box
      sx={{
        marginTop: "64px",
        padding: {
          xs: "16px",
          md: "64px 32px",
        },
        background: `${theme === "light"
          ? "linear-gradient(to right, #a1c4fd96 0%, #c2e9fbb5 100%) "
          : "rgba(255 255 255 / 0.1)"
          } `,
      }}
    >
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid md={12} lg={4}>
          <Typography sx={{ marginBottom: "12px" }} level="h4">
            Giới thiệu
          </Typography>
          <Typography level="title-md">
            Chào mừng bạn đến với CLOWPHIM, nơi trải nghiệm điện ảnh trực
            tuyến trở nên dễ dàng và thú vị hơn bao giờ hết! Tại đây, bạn sẽ
            khám phá hàng ngàn bộ phim đa dạng từ bom tấn Hollywood đến các tác
            phẩm nghệ thuật quốc tế và phim bộ truyền hình hấp dẫn. Với giao
            diện thân thiện, tốc độ tải nhanh và chất lượng HD sắc nét.
          </Typography>
        </Grid>
        <Grid md={12} lg={4}>
          <Typography sx={{ marginBottom: "12px" }} level="h4">
            Bản quyền
          </Typography>
          <Typography level="title-md">
            Tất cả nội dung của trang web này đều được tìm kiếm và thu thập ở
            các trang web phát video trực tuyến chính thống trên Internet, cũng
            như không cung cấp phát trực tuyến chính hãng. Nếu quyền lợi của bạn
            bị vi phạm, hãy liên hệ với chúng tôi. Chúng tôi sẽ xử lý và xóa các
            nội dung liên quan đó kịp thời. Xin cảm ơn!
          </Typography>
        </Grid>
        <Grid sm={12} md={12} xs={12}>
          <Typography
            sx={{ textAlign: "center", marginTop: "24px" }}
            level="title-md"
            color="primary"
          >
            © 2025 - ClowKhxu
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
