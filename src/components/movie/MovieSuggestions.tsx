import { Alert, Box, Typography } from "@mui/joy";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../redux/asyncThunk/moviesThunk";
import MovieList from "../movie/MovieList";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import { randomItemInArray } from "../../utils";
import { useParams } from "react-router-dom";
import RefreshButton from "../common/RefreshButton";
import toast from "react-hot-toast";

const MovieSuggestions = () => {
  const dispatch: AppDispatch = useDispatch();
  const isMobile = useSelector((state: RootState) => state.system.isMobile);
  const params = useParams();
  const movies = useSelector((state: RootState) => state.movies.movieDetail);
  const categories = useSelector((state: RootState) => state.movies.categories);
  const countries = useSelector((state: RootState) => state.movies.countries);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const width = useSelector((state: RootState) => state.system.width);

  useEffect(() => {
    handleGenerateSuggestion();
  }, [params?.slug]);

  const handleGenerateSuggestion = async () => {
    if (categories.length > 0 && countries.length > 0) {
      const randomItem = randomItemInArray([...categories, ...countries]);
      const isExistCategory = categories.findIndex(
        (item) => item?.slug === randomItem.slug
      );
      const describe = isExistCategory !== -1 ? "the-loai" : "quoc-gia";

      setIsLoading(true);
      await dispatch(
        getMovieDetail({
          describe,
          slug: randomItem?.slug,
          page: 2,
          quantity: width < 467 ? 8 : 24,
        })
      );
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    await handleGenerateSuggestion();
    toast.success("Gợi ý đã được cập nhật!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Alert
        startDecorator={
          <Typography startDecorator={<BubbleChartIcon />} level="title-lg">
            Gợi ý dành cho bạn
          </Typography>
        }
        endDecorator={
          <RefreshButton
            title="Gợi ý khác"
            isLoading={isLoading}
            handleRefresh={handleRefresh}
          />
        }
        color="neutral"
      />

      <MovieList movies={movies.items} isLoading={isLoading} />
    </Box>
  );
};

export default MovieSuggestions;
