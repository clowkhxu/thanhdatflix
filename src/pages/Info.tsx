import { Box, Divider, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieInfo } from "../redux/asyncThunk/moviesThunk";
import "../styles/Info.scss";
import BreadcrumbsCustom from "../components/BreadcrumbsCustom";
import MovieSuggestions from "../components/movie/MovieSuggestions";
import SkeletonPage from "../components/common/SkeletonPage";
import SectionCardMovie from "./Info/SectionCardMovie";
import SectionInfoMovie from "./Info/SectionInfoMovie";
import SectionContentMovie from "./Info/SectionContentMovie";
import SectionTrailerMovie from "./Info/SectionTrailerMovie";

const Info = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const movieInfo = useSelector(
    (state: RootState) => state.movies.movieInfo.info
  );
  const isError = useSelector((state: RootState) => state.movies.isError);
  const [isSave, setIsSave] = useState<boolean>(false);
  const breadcrumbsPaths = ["Thông tin phim", movieInfo.name];
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (movieInfo?.name && movieInfo?.origin_name) {
      document.title = `Thông tin phim ${movieInfo?.name} - ${movieInfo?.origin_name}`;
    }
  }, [movieInfo]);

  useEffect(() => {
    const handleInit = async () => {
      setIsLoading(true);
      await dispatch(getMovieInfo(params.slug as string));
      setIsLoading(false);
    };

    handleInit();
  }, [params?.slug]);

  if (isLoading) {
    return <SkeletonPage page="info" />;
  }

  if (!movieInfo?.slug && isError) {
    return (
      <Typography level="title-lg" color="danger">
        Không tìm thấy thông tin phim!
      </Typography>
    );
  }

  return (
    <>
      {!isLoading && (
        <>
          <BreadcrumbsCustom paths={breadcrumbsPaths as string[]} />

          <Box className="info-container">
            <Box className="info-container-inner">
              <SectionCardMovie
                movieInfo={movieInfo}
                navigate={navigate}
                isSave={isSave}
                setIsSave={setIsSave}
              />

              <SectionInfoMovie movieInfo={movieInfo} />
            </Box>

            <SectionContentMovie content={movieInfo.content as string} />

            {movieInfo?.trailer_url && (
              <>
                <Divider />
                <SectionTrailerMovie trailer_url={movieInfo.trailer_url} />
              </>
            )}

            <Divider />

            <MovieSuggestions />
          </Box>
        </>
      )}
    </>
  );
};

export default Info;
