import { useDispatch, useSelector } from "react-redux";
import { IMovie } from "../../interfaces/movie";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import { IUser } from "../../interfaces/user";
import { useEffect, useState } from "react";
import {
  addMovie,
  deleteMovie,
  getAllMovies,
} from "../../redux/asyncThunk/moviesThunk";
import toast from "react-hot-toast";
import { Box, Button, IconButton, Tooltip } from "@mui/joy";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ImageError from "../../images/image-error.jpg";

interface ISectionCardMovie {
  movieInfo: IMovie;
  navigate: any;
  isSave: boolean;
  setIsSave: (isSave: boolean) => void;
}

const SectionCardMovie = ({
  movieInfo,
  navigate,
  isSave,
  setIsSave,
}: ISectionCardMovie) => {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const user: IUser = useSelector((state: RootState) => state.users.user);
  const savedMovies = useSelector(
    (state: RootState) => state.movies.savedMovies.movies
  );
  const theme = useSelector((state: RootState) => state.system.theme);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const width = useSelector((state: RootState) => state.system.width);

  useEffect(() => {
    if (user?.access_token || user?.refresh_token) {
      dispatch(
        getAllMovies({
          userId: user?.id as string,
          type: "saved-movies",
        })
      );
    }
  }, [user, params]);

  useEffect(() => {
    const isExist: boolean = savedMovies.some(
      (item: any) => item.slug === params.slug
    );
    setIsSave(isExist);
  }, [savedMovies]);

  const handleSaveMovie = async () => {
    if (!user.access_token || !user.refresh_token) {
      toast.error("Vui lòng đăng nhập để lưu phim!");
      return;
    }

    setIsLoading(true);
    const res: any = await dispatch(
      addMovie({
        userId: user?.id as string,
        movieInfo,
        type: "saved-movies",
      })
    );

    if (+res?.payload?.EC === 0) {
      toast.success("Lưu phim thành công!");
      setIsSave(!isSave);
    }
    setIsLoading(false);
  };

  const handleUnSaveMovie = async () => {
    setIsLoading(true);
    const res: any = await dispatch(
      deleteMovie({
        userId: user?.id as string,
        movieSlug: movieInfo?.slug as string,
        type: "saved-movies",
      })
    );

    if (+res?.payload?.EC === 0) {
      toast.success(res?.payload?.EM);
      setIsSave(!isSave);
    }
    setIsLoading(false);
  };

  return (
    <Box className="section-card-movie">
      <Box className="section-card-movie-inner">
        <img
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = ImageError;
          }}
          src={width > 1024 ? movieInfo.poster_url : movieInfo?.thumb_url}
          alt={movieInfo.name}
        />
      </Box>
      <Box className="section-card-movie-actions">
        <Button
          onClick={() => navigate(`/dang-xem/${movieInfo.slug}`)}
          startDecorator={<PlayArrowRoundedIcon />}
          variant="solid"
          color="primary"
        >
          Xem ngay
        </Button>
        {isSave ? (
          <Tooltip
            title="Xoá phim"
            variant={theme === "light" ? "soft" : "solid"}
            color="danger"
          >
            <IconButton
              loading={isLoading}
              onClick={() => handleUnSaveMovie()}
              variant="solid"
              color="danger"
            >
              <BookmarkRemoveOutlinedIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip
            title="Lưu phim"
            variant={theme === "light" ? "soft" : "solid"}
            color={theme === "light" ? "primary" : "neutral"}
          >
            <IconButton
              loading={isLoading}
              onClick={() => handleSaveMovie()}
              variant="solid"
              color="neutral"
            >
              <BookmarkAddOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default SectionCardMovie;
