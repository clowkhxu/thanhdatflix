import { Alert, Box, Button, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import MovieList from "../components/movie/MovieList";
import { useEffect, useState } from "react";
import ModalAlertDialog from "../components/modals/ModalAlertDialog";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";
import {
  deleteAllMovie,
  deleteMovie,
  getAllMovies,
} from "../redux/asyncThunk/moviesThunk";
import toast from "react-hot-toast";
import SkeletonPage from "../components/common/SkeletonPage";
import { IUser } from "../interfaces/user";
import { useNavigate } from "react-router-dom";
import imageSaveMovie from "../images/save-movie.png";
import ShowBackground from "../components/common/ShowBackground";
import ButtonSeeMore from "../components/common/ButtonSeeMore";

const SavedMovie = () => {
  const dispatch: AppDispatch = useDispatch();
  const savedMovies = useSelector(
    (state: RootState) => state.movies.savedMovies.movies
  );
  const [movies, setMovies] = useState<any[]>([]);
  const navigate = useNavigate();
  const user: IUser = useSelector((state: RootState) => state.users.user);
  const [open, setOpen] = useState<boolean>(false);
  const breadcrumbsPaths = ["Phim đã lưu"];
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const isMobile = useSelector((state: RootState) => state.system.isMobile);

  useEffect(() => {
    setMovies(savedMovies.slice(0, 12));
  }, [savedMovies]);

  useEffect(() => {
    document.title = "Phim Đã Lưu Của Bạn - Xem Lại Mọi Lúc, Mọi Nơi!";
  }, []);

  useEffect(() => {
    const handleInit = async () => {
      setIsLoading(true);
      await dispatch(
        getAllMovies({
          userId: user?.id as string,
          type: "saved-movies",
        })
      );
      setIsLoading(false);
    };

    if (user?.access_token || user?.refresh_token) {
      handleInit();
    } else {
      navigate("/");
    }
  }, [user]);

  const handleDeleteMovie = async (slug: string, type: string) => {
    const res: any = await dispatch(
      deleteMovie({
        userId: user?.id as string,
        movieSlug: slug ?? "",
        type,
      })
    );

    if (+res?.payload?.EC === 0) {
      await dispatch(
        getAllMovies({
          userId: user?.id as string,
          type: "saved-movies",
        })
      );
      toast.success(res?.payload?.EM);
    }
  };

  const handleDeleteAll = async () => {
    setIsLoadingButton(true);
    const res: any = await dispatch(
      deleteAllMovie({
        userId: user?.id as string,
        type: "saved-movies",
      })
    );

    setIsLoadingButton(false);

    if (+res.payload?.EC === 0) {
      toast.success(res.payload?.EM);
      setOpen(false);
      setIsLoading(true);
      await dispatch(
        getAllMovies({
          userId: user?.id as string,
          type: "saved-movies",
        })
      );
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SkeletonPage page="saved-movies" />;
  }

  if (!isLoading && savedMovies.length === 0) {
    return (
      <ShowBackground
        urlImage={imageSaveMovie}
        content="Danh sách phim đã lưu đang trống!"
      />
    );
  }

  return (
    <>
      <BreadcrumbsCustom paths={breadcrumbsPaths} />
      <Box
        sx={{
          display: "flex",
          gap: "24px",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Alert
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            startDecorator={<BookmarkAddedRoundedIcon />}
            level={isMobile ? "title-sm" : "title-md"}
          >
            Phim đã lưu
          </Typography>
          <Button onClick={() => setOpen(true)} color="danger" variant="solid">
            Xoá tất cả
          </Button>
        </Alert>
        <MovieList
          movies={movies}
          page="savedMovies"
          handleDeleteMovie={handleDeleteMovie}
        />
      </Box>

      {movies.length < savedMovies.length && (
        <Box
          sx={{ display: "flex", marginTop: "48px", justifyContent: "center" }}
        >
          <ButtonSeeMore
            currentData={movies}
            originalData={savedMovies}
            countDisplay={10}
            setData={setMovies}
            title="phim"
          />
        </Box>
      )}

      <ModalAlertDialog
        isLoading={isLoadingButton}
        open={open}
        setOpen={setOpen}
        handleSubmit={handleDeleteAll}
        title="Xoá phim đã lưu"
        content="Bạn có chắc chắn muốn xoá tất cả phim đã lưu?"
      />
    </>
  );
};

export default SavedMovie;
