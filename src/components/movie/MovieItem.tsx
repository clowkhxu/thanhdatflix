import { Box, Button, Chip, IconButton, Tooltip, Typography } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/MovieItem.scss";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import _NavLink from "../common/_NavLink";
import { IMovie } from "../../interfaces/movie";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import imageError from "../../images/image-error.jpg";

interface IProps {
  movie: IMovie;
  page: string;
  handleDeleteMovie?: (slug: string, type: string) => void;
}

const MovieItem = ({ movie, page, handleDeleteMovie }: IProps) => {
  const navigate = useNavigate();
  const width = useSelector((state: RootState) => state.system.width);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useSelector((state: RootState) => state.system.theme);

  const deleteMovie = async (slug: string, type: string) => {
    setIsLoading(true);
    if (handleDeleteMovie) {
      await handleDeleteMovie(slug, type);
    }
    setIsLoading(false);
  };

  return (
    <Box className="movie-item">
      <Link to={`/thong-tin/${movie.slug}`}>
        <img
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `${imageError}`;
          }}
          src={
            (movie?.poster_url as string)?.includes(
              process.env.REACT_APP_API_HINH_ANH as string
            )
              ? movie?.poster_url
              : `${process.env.REACT_APP_API_HINH_ANH as string}/${
                  movie?.poster_url
                }`
          }
          alt={movie.name}
        />
      </Link>
      <Box
        sx={{
          position: "absolute",
          top: "8px",
          right: "8px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "end",
          gap: "12px",
        }}
      >
        <Chip
          size="sm"
          variant={theme === "light" ? "soft" : "solid"}
          color="neutral"
        >
          {movie?.lang !== "" ? movie?.lang : "Không xác định"}
        </Chip>
        <Chip
          size="sm"
          variant={theme === "light" ? "soft" : "solid"}
          color="primary"
        >
          {movie?.time !== "" ? movie?.time : "Không xác định"}
        </Chip>
      </Box>
      <Box className="movie-item-info">
        <Typography
          level="title-md"
          sx={{
            color: "#fff",
            textShadow: "2px 2px #00000080",
          }}
        >
          {movie.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            marginTop: "12px",
            gap: "12px",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <Button
            sx={{ width: page ? "unset" : "100%" }}
            startDecorator={<PlayArrowRoundedIcon />}
            onClick={() => navigate(`/dang-xem/${movie.slug}`)}
            size="sm"
            variant="solid"
            color="primary"
          >
            Xem ngay
          </Button>
          {(page === "watchHistory" || page === "savedMovies") && (
            <Tooltip
              title={
                page === "watchHistory" ? "Xoá khỏi lịch sử" : "Bỏ lưu phim"
              }
            >
              <Button
                loading={isLoading}
                onClick={() =>
                  handleDeleteMovie &&
                  (page === "watchHistory"
                    ? deleteMovie(movie.slug as string, "watch-history")
                    : deleteMovie(movie.slug as string, "saved-movies"))
                }
                color="danger"
                size="sm"
              >
                Xoá
              </Button>
            </Tooltip>
          )}
        </Box>
      </Box>
      {width < 1024 && (page === "watchHistory" || page === "savedMovies") && (
        <IconButton
          loading={isLoading}
          onClick={() =>
            handleDeleteMovie &&
            (page === "watchHistory"
              ? deleteMovie(movie.slug as string, "watch-history")
              : deleteMovie(movie.slug as string, "saved-movies"))
          }
          sx={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
          }}
          color="danger"
          size="sm"
          variant="solid"
        >
          <DeleteOutlineIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default MovieItem;
