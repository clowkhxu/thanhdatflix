import { Alert, Box, Typography } from "@mui/joy";
import YouTubeIcon from "@mui/icons-material/YouTube";

const SectionTrailerMovie = ({ trailer_url }: { trailer_url: string }) => {
  return (
    <Box>
      <Alert
        color="neutral"
        sx={{ flexDirection: "column", alignItems: "start" }}
      >
        <Typography startDecorator={<YouTubeIcon />} level="h4">
          Trailer phim
        </Typography>
      </Alert>
      <Box
        sx={{
          width: "100%",
          height: "360px",
          borderRadius: "8px",
          overflow: "hidden",
          marginTop: "12px",
        }}
      >
        <iframe
          style={{
            width: "100%",
            height: "100%",
          }}
          frameBorder="0"
          allowFullScreen
          allow="accelerometer"
          referrerPolicy="strict-origin-when-cross-origin"
          src={trailer_url.replace("watch?v=", "/embed/")}
        ></iframe>
      </Box>
    </Box>
  );
};

export default SectionTrailerMovie;