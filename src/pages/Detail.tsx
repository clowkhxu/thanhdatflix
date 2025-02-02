import { Alert, Box, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { getMovieDetail } from "../redux/asyncThunk/moviesThunk";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import MovieList from "../components/movie/MovieList";
import { Experimental_CssVarsProvider, Pagination, Stack } from "@mui/material";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";
import _ from "lodash";
import SkeletonPage from "../components/common/SkeletonPage";
import { generateYears, scrollToTop } from "../utils";
import imageLoadingMovieError from "../images/loading-movie-error.png";
import ShowBackground from "../components/common/ShowBackground";
import _Pagination from "../components/common/_Pagination";

type describe = Record<string, string>;
type slug = Record<string, string>;

const Detail = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    categories,
    countries,
    movieDetail: {
      items: movies,
      pagination: { totalItems, totalPages },
      titlePage,
      titleHead,
    },
    isError,
  } = useSelector((state: RootState) => state.movies);
  const { isMobile, width } = useSelector((state: RootState) => state.system);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const params = useParams<{ describe: string; slug: string }>();
  const [describeMapping, setDescribeMapping] = useState<describe>({
    "the-loai": "Thể loại",
    "quoc-gia": "Quốc gia",
    "danh-sach": "Danh sách",
    nam: "Năm",
  });
  const [slugMapping, setSlugMapping] = useState<slug>({
    "phim-bo": "Phim bộ",
    "phim-le": "Phim lẻ",
    "hoat-hinh": "Hoạt hình",
    "tv-shows": "Tv shows",
  });
  const [breadcrumbsPaths, setBreadcrumbsPaths] = useState<string[]>([]);

  const apiUrls = {
    "phim-bo": "https://script.google.com/macros/s/AKfycbyo_0r86CElDEeUMakXyXrQG5h6lYRiAKQRQ3lgBYMDWz6Rr2pAT8ouwHpERqAhQTuWrg/exec?path=danh-sach/phim-bo",
    "phim-le": "https://script.google.com/macros/s/AKfycbwXTAX_jUk9wK-RVxL45wv4oTU2C8eiwst5pTgQtp1qhIda5_dvXxyl3p1wW1gUgEHHGw/exec?path=danh-sach/phim-le",
    "nam": "https://script.google.com/macros/s/AKfycbxnu3eYApgpMtEtoBluQSnAZX9jnJYXYxZYE5EI8FH3rQ2vwNenrjp9vbWbU1hEmt6VYw/exec?path=nam",
  };

  useEffect(() => {
    document.title = titleHead;
  }, [titleHead]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearMapping = Object.fromEntries(
      generateYears(1983, currentYear).map((year) => [
        year.toString(),
        year.toString(),
      ])
    );

    const categoryMapping = Object.fromEntries(
      categories.map((category) => [category.slug, category.name])
    );

    const countryMapping = Object.fromEntries(
      countries.map((country) => [country.slug, country.name])
    );

    setSlugMapping((prev) => ({
      ...prev,
      ...categoryMapping,
      ...countryMapping,
      ...yearMapping,
    }));
  }, [categories, countries]);

  useEffect(() => {
    setBreadcrumbsPaths([
      describeMapping[params.describe as string] || "Không xác định",
      slugMapping[params.slug as string] || "Không xác định",
    ]);
  }, [params, describeMapping, slugMapping]);

  useEffect(() => {
    const handleInit = async () => {
      setIsLoading(true);

      // Kiểm tra xem describe có hợp lệ trong apiUrls không
      const describeKey = params.describe as keyof typeof apiUrls;
      if (!apiUrls[describeKey]) {
        console.error("Không tìm thấy URL hợp lệ cho describe:", describeKey);
        setIsLoading(false);
        return;
      }

      // Xây dựng URL API
      let apiUrl = "";
      if (describeKey === "nam") {
        apiUrl = `${apiUrls[describeKey]}${params.slug ? `/${params.slug}` : ""}`;
      } else {
        apiUrl = apiUrls[describeKey];
      }

      // Gọi API mới
      await dispatch(
        getMovieDetail({
          apiUrl,  // Truyền apiUrl vào
          page: currentPage,
          quantity: width < 467 ? 8 : 24,
        })
      );
      setIsLoading(false);
    };
    handleInit();
  }, [params?.slug, currentPage]);

  useEffect(() => {
    setTimeout(() => {
      setCurrentPage(1);
    }, 500);
  }, [params]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    scrollToTop();
    setTimeout(() => {
      setCurrentPage(value);
    }, 200);
  };

  if (isLoading && !isError) {
    return <SkeletonPage page="detail" />;
  }

  if (!isLoading && isError) {
    return (
      <ShowBackground
        urlImage={imageLoadingMovieError}
        content="Không tìm thấy dữ liệu!"
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: "24px",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box>
        {movies.length > 0 && !isLoading && (
          <>
            <BreadcrumbsCustom paths={breadcrumbsPaths} />
            <Alert
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
              color="neutral"
            >
              <Typography
                startDecorator={<LiveTvRoundedIcon />}
                level={!isMobile ? "title-md" : "title-sm"}
              >
                {`${titlePage} (${totalItems} bộ)`}
              </Typography>
              <Typography
                color="neutral"
                level="title-sm"
              >{`Trang ${currentPage}`}</Typography>
            </Alert>
          </>
        )}
      </Box>

      <MovieList movies={movies} />

      <_Pagination
        handleChange={handleChange}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </Box>
  );
};

export default Detail;
