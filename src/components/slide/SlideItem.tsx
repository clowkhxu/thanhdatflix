import { Box, Button, Chip, Typography } from "@mui/joy";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IMovie } from "../../interfaces/movie";
import { RootState } from "../../redux/store";

interface IProps {
  item: IMovie;
  key: number;
}

const SlideItem = ({ item }: IProps) => {
  const navigate = useNavigate();
  const width: number = useSelector((state: RootState) => state?.system?.width);
  const isLargeScreen: boolean = width > 1024;
  const theme = useSelector((state: RootState) => state.system.theme);

  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        bottom: "24px",
        left: "24px",
        right: !isLargeScreen ? "24px" : "unset",
        backdropFilter: isLargeScreen ? "blur(8px)" : "unset",
        backgroundColor: isLargeScreen ? "rgba(255, 255, 255, 0.3)" : "unset",
        border: isLargeScreen ? "1px solid rgba(61, 71, 81, 0.3)" : "unset",
        padding: isLargeScreen ? "16px" : "0",
        borderRadius: "12px",
        gap: "24px",
        maxHeight: "200px",
        minWidth: "260px",
        maxWidth: "640px",
      }}
    >
      {isLargeScreen && (
        <Box
          sx={{
            flexShrink: 0,
            width: "120px",
            height: "160px",
            overflow: "hidden",
            borderRadius: "8px",
            border: "1px solid rgba(61, 71, 81, 0.3)",
          }}
        >
          <img
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={item?.poster_url}
            alt={item?.name}
          />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            textAlign: "start",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            textShadow: "2px 2px #00000080",
            color: "#fff",
          }}
          level="title-lg"
        >
          {item?.name}
        </Typography>
        {isLargeScreen && (
          <Typography
            sx={{
              color: "#000",
              textAlign: "start",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
            color="primary"
            level="title-md"
          >
            {item?.origin_name}
          </Typography>
        )}
        <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Button
            onClick={() => navigate(`/dang-xem/${item?.slug}`)}
            size={isLargeScreen ? "md" : "sm"}
            color="primary"
            variant="solid"
            startDecorator={<PlayArrowRoundedIcon />}
          >
            Xem ngay
          </Button>
          <Button
            onClick={() => navigate(`/thong-tin/${item?.slug}`)}
            size={isLargeScreen ? "md" : "sm"}
            color="neutral"
            variant={theme === "light" ? "soft" : "solid"}
            startDecorator={<InfoOutlinedIcon />}
          >
            Chi tiết
          </Button>
        </Box>
        <Chip
          size="sm"
          sx={{ marginTop: "8px" }}
          variant={theme === "light" ? "soft" : "solid"}
          color={theme === "light" ? "primary" : "neutral"}
        >
          Năm phát hành {item?.year}
        </Chip>
      </Box>
    </Box>
  );
};

export default SlideItem;
