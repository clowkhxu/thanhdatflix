import { Alert, Box, Typography } from "@mui/joy";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

const SectionContentMovie = ({ content }: { content: string }) => {
  return (
    <Box>
      <Alert color="neutral">
        <Typography startDecorator={<ArticleOutlinedIcon />} level="title-lg">
          Nội dung phim
        </Typography>
      </Alert>
      <Typography sx={{ padding: " 8px" }} level="body-lg">
        {content}
      </Typography>
    </Box>
  );
};

export default SectionContentMovie;