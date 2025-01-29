import { Alert, Box, Button, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import MovieList from "../components/movie/MovieList";
import { useEffect, useState } from "react";
import SkeletonPage from "../components/common/SkeletonPage";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ModalAlertDialog from "../components/modals/ModalAlertDialog";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";
import {
  deleteAllMovie,
  deleteMovie,
  getAllMovies,
} from "../redux/asyncThunk/moviesThunk";
import toast from "react-hot-toast";
import { IUser } from "../interfaces/user";
import { useNavigate } from "react-router-dom";
import imageWatchHistory from "../images/watch-history.png";
import ShowBackground from "../components/common/ShowBackground";
import ButtonSeeMore from "../components/common/ButtonSeeMore";

type TypeDelete = "watch-history" | "saved-movies";

const WatchHistory = () => {
  const watchHistory = useSelector(
    (state: RootState) => state.movies.watchHistory.movies
  );
  const [movies, setMovies] = useState<any[]>([]);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user: IUser = useSelector((state: RootState) => state.users.user);
  const isMobile = useSelector((state: RootState) => state.system.isMobile);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const breadcrumbsPaths = ["Lịch sử đã xem"];

  useEffect(() => {
    setMovies(watchHistory.slice(0, 12));
  }, [watchHistory]);

  useEffect(() => {
    document.title = "Nhật Ký Xem Phim - Theo Dõi Hành Trình Giải Trí Của Bạn!";
  }, []);

  useEffect(() => {
    const handleInit = async () => {
      setIsLoading(true);
      await dispatch(
        getAllMovies({
          userId: user?.id as string,
          type: "watch-history",
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
          type: "watch-history",
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
        type: "watch-history",
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
          type: "watch-history",
        })
      );
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SkeletonPage page="watch-history" />;
  }

  if (!isLoading && watchHistory.length === 0) {
    return (
      <ShowBackground
        urlImage={imageWatchHistory}
        content="Lịch sử xem trống!"
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
            startDecorator={<HistoryOutlinedIcon />}
            level={isMobile ? "title-sm" : "title-md"}
          >
            Lịch sử xem gần đây
          </Typography>
          <Button onClick={() => setOpen(true)} color="danger" variant="solid">
            Xoá lịch sử
          </Button>
        </Alert>
        <MovieList
          movies={movies}
          page="watchHistory"
          handleDeleteMovie={handleDeleteMovie}
        />
      </Box>

      {movies.length < watchHistory.length && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "48px" }}
        >
          <ButtonSeeMore
            currentData={movies}
            originalData={watchHistory}
            countDisplay={12}
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
        title="Xoá lịch sử đã xem"
        content="Bạn có chắc chắn muốn xoá toàn bộ lịch sử đã xem?"
      />
    </>
  );
};

export default WatchHistory;
