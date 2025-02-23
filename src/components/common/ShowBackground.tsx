import { Box, Typography } from "@mui/joy";

interface ShowBackgroundProps {
  content: string;
  urlImage: string;
  width?: string;
  height?: string;
  color?: "primary" | "danger" | "neutral" | "success" | "warning";
}

const ShowBackground = ({
  urlImage,
  content,
  width,
  height,
  color
}: ShowBackgroundProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: width ?? "128px",
          height: height ?? "128px",
          backgroundImage: `url(${urlImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          margin: "auto",
        }}
      />
      <Typography level="title-lg" color={color ?? "primary"}>
        {content}
      </Typography>
    </Box>
  );
};

export default ShowBackground;
