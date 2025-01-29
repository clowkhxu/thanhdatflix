import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Alert, Box, Button, Typography } from "@mui/joy";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";

interface SearchPreviewProps {
  handleClickSearchPreview: (slug: string) => void;
  handleSeeAll: () => void;
}

const SearchPreview = ({
  handleClickSearchPreview,
  handleSeeAll,
}: SearchPreviewProps) => {
  const movies = useSelector((state: RootState) => state.movies.searchPreview);
  const isMobile = useSelector((state: RootState) => state.system.isMobile);
  const theme = useSelector((state: RootState) => state.system.theme);

  return (
    <Box
      className="search-list"
      sx={{
        overflowY: "auto",
        minHeight: {
          xs: "calc(100vh - 300px)",
          sm: "calc(100vh - 200px)",
        },
        maxHeight: {
          xs: "calc(100vh - 300px)",
          sm: "calc(100vh - 200px)",
        },
      }}
    >
      {movies?.length > 0 && (
        <Typography
          startDecorator={<SearchIcon />}
          color={theme === "light" ? "primary" : "neutral"}
          sx={{ marginBottom: "12px" }}
        >
          Top {movies?.length} bộ phim phù hợp!
        </Typography>
      )}
      {movies?.map((movie: any, index: number) => (
        <Box
          onClick={() => handleClickSearchPreview(movie?.slug)}
          key={index}
          sx={{
            display: "flex",
            gap: "12px",
            alignItems: "start !important",
            padding: "8px",
            border: "1px solid rgba(61, 71, 81, 0.3)",
            borderRadius: "12px",
            justifyContent: "space-between",
            cursor: "pointer",
            transition: "0.1s",
            "&:hover": {
              color: `${theme === "light" ? "#006BD6" : "#66B3FF"}`,
              backgroundColor: theme === "light" ? "#ebf5ff" : "rgb(9,34,59)",
              borderColor: theme === "light" ? "#66b3ff" : "rgb(5,61,119)",
            },
          }}
        >
          <Box
            sx={{
              flex: 1,
            }}
          >
            <img
              src={
                (movie?.poster_url as string)?.includes(
                  process.env.REACT_APP_API_HINH_ANH as string
                )
                  ? movie?.poster_url
                  : `${process.env.REACT_APP_API_HINH_ANH as string}/${
                      movie?.poster_url
                    }`
              }
              alt={movie?.name}
            />
          </Box>
          <Box
            sx={{
              width: {
                xs: "calc(100% - 92px)",
                sm: "calc(100% - 132px)",
              },
            }}
          >
            <Typography
              sx={{
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              color="primary"
              level={isMobile ? "title-sm" : "title-md"}
            >
              {movie?.name}
            </Typography>
            <Typography
              sx={{
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              level={isMobile ? "body-xs" : "body-md"}
            >
              {movie?.origin_name}
            </Typography>
            <Typography level={isMobile ? "body-xs" : "body-md"}>
              {movie?.time}
            </Typography>
            <Typography level={isMobile ? "body-xs" : "body-md"}>
              {movie?.lang}
            </Typography>
            <Typography level={isMobile ? "body-xs" : "body-md"}>
              {movie?.quality}
            </Typography>
          </Box>
        </Box>
      ))}

      {movies?.length >= 10 && (
        <Button
          size="lg"
          variant="solid"
          color={theme === "light" ? "primary" : "neutral"}
          sx={{ width: "100%", marginTop: "12px" }}
          endDecorator={<ChevronRightIcon />}
          onClick={() => handleSeeAll()}
        >
          Xem tất cả kết quả
        </Button>
      )}
    </Box>
  );
};

export default SearchPreview;
