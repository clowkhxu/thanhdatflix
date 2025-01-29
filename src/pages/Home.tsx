import { useDispatch, useSelector } from "react-redux";
import SlideList from "../components/slide/SlideList";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import {
  getCartoon,
  getFeatureFilm,
  getSlideShow,
  getTelevisionSeries,
  getTvShows,
} from "../redux/asyncThunk/moviesThunk";
import { Box } from "@mui/joy";
import MovieList from "../components/movie/MovieList";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import TitleContainer from "../components/common/TitleContainer";
import toast from "react-hot-toast";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies);
  const featureFilm = movies.featureFilm;
  const televisionSeries = movies.televisionSeries;
  const cartoon = movies.cartoon;
  const tvShows = movies.tvShows;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const width = useSelector((state: RootState) => state.system.width);

  useEffect(() => {
    const handleInit = async () => {
      try {
        await Promise.all([
          dispatch(getSlideShow()),
          dispatch(getFeatureFilm(width < 467 ? 8 : 24)),
          dispatch(getTelevisionSeries(width < 467 ? 8 : 24)),
          dispatch(getCartoon(width < 467 ? 8 : 24)),
          dispatch(getTvShows(width < 467 ? 8 : 24)),
        ]);
      } catch (error) {
        toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!");
      } finally {
        setIsLoading(false);
      }
    };

    handleInit();
  }, [dispatch]);

  
  useEffect(() => {
    document.title = "Thế Giới Phim - Xem Phim Hay, Phim Mới Mỗi Ngày!";
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <SlideList />
      <Box>
        <TitleContainer
          path="/chi-tiet/danh-sach/phim-le"
          content="Phim lẻ"
          icon={<LiveTvRoundedIcon />}
        />
        <MovieList movies={featureFilm} isLoading={isLoading} />
      </Box>
      <Box>
        <TitleContainer
          path="/chi-tiet/danh-sach/phim-bo"
          content="Phim bộ"
          icon={<LiveTvRoundedIcon />}
        />
        <MovieList movies={televisionSeries} isLoading={isLoading} />
      </Box>
      <Box>
        <TitleContainer
          path="/chi-tiet/danh-sach/hoat-hinh"
          content="Hoạt hình"
          icon={<LiveTvRoundedIcon />}
        />
        <MovieList movies={cartoon} isLoading={isLoading} />
      </Box>
      <Box>
        <TitleContainer
          path="/chi-tiet/danh-sach/tv-shows"
          content="Chương trình TV"
          icon={<LiveTvRoundedIcon />}
        />
        <MovieList movies={tvShows} isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default Home;
