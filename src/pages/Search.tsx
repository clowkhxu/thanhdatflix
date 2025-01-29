import { Alert, Box, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { searchMovie } from "../redux/asyncThunk/moviesThunk";
import MovieList from "../components/movie/MovieList";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";
import SkeletonPage from "../components/common/SkeletonPage";
import SearchIcon from "@mui/icons-material/Search";
import { scrollToTop } from "../utils";
import _Pagination from "../components/common/_Pagination";

const Search = () => {
  const dispatch: AppDispatch = useDispatch();
  const movies = useSelector(
    (state: RootState) => state.movies.searchMovie.items
  );
  const totalItems = useSelector(
    (state: RootState) => state.movies.searchMovie.pagination.totalItems
  );
  const totalPages = useSelector(
    (state: RootState) => state.movies.searchMovie.pagination.totalPages
  );
  const titleHead = useSelector(
    (state: RootState) => state.movies.searchMovie.titleHead
  );
  const isMobile = useSelector((state: RootState) => state.system.isMobile);
  const width = useSelector((state: RootState) => state.system.width);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const params = useParams();
  const breadcrumbsPaths = ["Tìm kiếm", params.keyword as string];

  useEffect(() => {
    document.title = titleHead || "Kết quả tìm kiếm";
  }, [titleHead]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    scrollToTop();
    setTimeout(() => {
      setCurrentPage(value);
    }, 200);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      await dispatch(
        searchMovie({
          keyword: params.keyword as string,
          page: currentPage,
          quantity: width < 467 ? 8 : 24,
        })
      );
      setIsLoading(false);
    };
    fetchMovies();
  }, [params?.keyword, currentPage]);

  useEffect(() => {
    setTimeout(() => {
      setCurrentPage(1);
    }, 500);
  }, [params]);

  if (isLoading) {
    return <SkeletonPage page="search" />;
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
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
          color="neutral"
        >
          <Typography
            startDecorator={<SearchIcon />}
            level={isMobile ? "title-sm" : "title-md"}
          >
            {movies.length > 0
              ? `Tìm thấy ${totalItems} bộ phim phù hợp với từ khoá "${params.keyword}"`
              : `Không tìm thấy phim phù hợp với từ khoá "${params.keyword}"!`}
          </Typography>

          {movies.length > 0 && (
            <Typography color="neutral" level="title-sm">
              {`Trang ${currentPage}`}
            </Typography>
          )}
        </Alert>

        {movies.length > 0 && (
          <>
            <MovieList movies={movies} />
            <_Pagination
              handleChange={handleChange}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default Search;
