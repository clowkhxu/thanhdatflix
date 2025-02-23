import { Alert, Box, IconButton, Tooltip, Typography } from "@mui/joy";
import { shareInfo } from "../../utils";
import ShareIcon from "@mui/icons-material/Share";
import InfoRow from "../../components/common/InfoRow";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const SectionInfoMovie = ({ movieInfo }: any) => {
  const theme = useSelector((state: RootState) => state.system.theme);

  return (
    <Box className="section-info-movie">
      <Alert
        color="neutral"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Tooltip
          sx={{
            position: "absolute",
            right: "12px",
            top: "12px",
          }}
          title="Chia sẻ"
          variant={theme === "light" ? "soft" : "solid"}
          color={theme === "light" ? "primary" : "neutral"}
        >
          <IconButton
            onClick={() =>
              shareInfo({
                title: movieInfo.name,
                text: movieInfo.name,
                url: window.location.href,
              })
            }
          >
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <Typography
          sx={{
            marginTop: "32px",
          }}
          level="title-lg"
          color="primary"
        >
          {movieInfo.name}
        </Typography>
        <Typography level="title-md">{movieInfo.origin_name}</Typography>
      </Alert>

      <Alert
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "start",
        }}
        color="neutral"
      >
        <InfoRow
          canPress={false}
          type="only"
          label="Tình trạng:"
          value={movieInfo.episode_current}
        />
        <InfoRow
          canPress={false}
          type="only"
          label="Số tập:"
          value={movieInfo.episode_total}
        />
        <InfoRow
          canPress={false}
          type="only"
          label="Thời lượng:"
          value={movieInfo.time}
        />
        <InfoRow
          canPress={false}
          type="only"
          label="Năm phát hành:"
          value={movieInfo.year}
        />
        <InfoRow
          canPress={false}
          type="only"
          label="Chất lượng:"
          value={movieInfo.quality}
        />
        <InfoRow
          canPress={false}
          type="only"
          label="Ngôn ngữ:"
          value={movieInfo.lang}
        />

        <InfoRow
          canPress={false}
          type="many"
          label="Đạo diễn:"
          value={movieInfo.director}
        />
        <InfoRow
          describe="the-loai"
          canPress={true}
          type="many"
          label="Thể loại:"
          value={movieInfo.category}
        />
        <InfoRow
          describe="quoc-gia"
          canPress={true}
          type="many"
          label="Quốc gia:"
          value={movieInfo.country}
        />
      </Alert>
    </Box>
  );
};

export default SectionInfoMovie;
