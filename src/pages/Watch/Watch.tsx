import { Box, Divider, Typography } from "@mui/joy";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addMovie, getMovieInfo } from "../../redux/asyncThunk/moviesThunk";
import { useParams } from "react-router-dom";
import ModalInstructDowload from "../../components/modals/ModalInstructDowload";
import SkeletonPage from "../../components/common/SkeletonPage";
import MovieSuggestions from "../../components/movie/MovieSuggestions";
import BreadcrumbsCustom from "../../components/BreadcrumbsCustom";
import CommentSection from "../../components/comment/CommentSection";
import SectionDownload from "./SectionDownload";
import SectionRating from "./SectionRaing";
import SectionListEpisodes from "./SectionListEpisodes";
import SectionVideoPlayer from "./SectionVideoPlayer";

export type Episode = {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
};

const Watch = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.user);
  const movieInfo = useSelector(
    (state: RootState) => state.movies.movieInfo.info
  );
  const isError = useSelector((state: RootState) => state.movies.isError);

  const params = useParams();
  const currentEpisode = useSelector(
    (state: RootState) => state.watch.currentEpisode
  );
  const incognitoMode = useSelector(
    (state: RootState) => state.system.incognitoMode
  );
  const [open, setOpen] = useState<boolean>(false);
  const breadcrumbsPaths = [
    "Đang xem",
    currentEpisode.filename.replace(`- ${currentEpisode.name}`, ""),
    currentEpisode.name,
  ];
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (movieInfo?.name && movieInfo?.origin_name) {
      document.title = `Đang xem ${movieInfo.name} - ${movieInfo.origin_name}`;
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

  useEffect(() => {
    if ((user?.access_token || user?.refresh_token) && !incognitoMode) {
      if (movieInfo?.slug) {
        dispatch(
          addMovie({
            userId: user?.id as string,
            movieInfo,
            type: "watch-history",
          })
        );
      }
    }
  }, [user, movieInfo]);

  if (isLoading) {
    return <SkeletonPage page="info" />;
  }

  if (isError && !movieInfo?.slug) {
    return (
      <Typography level="title-lg" color="danger">
        Không tìm thấy thông tin phim!
      </Typography>
    );
  }

  return (
    <>
      <BreadcrumbsCustom paths={breadcrumbsPaths} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <SectionVideoPlayer />

        <SectionListEpisodes />

        <SectionRating />

        <SectionDownload
          link_m3u8={currentEpisode.link_m3u8 as string}
          setOpen={setOpen}
        />

        <Box sx={{ margin: "12px 0" }}>
          <Divider />
        </Box>

        <CommentSection />

        <Box sx={{ margin: "12px 0" }}>
          <Divider />
        </Box>

        <MovieSuggestions />
      </Box>

      <ModalInstructDowload open={open} setOpen={setOpen} />
    </>
  );
};
export default Watch;
