import { Alert, Box, Button, Typography } from "@mui/joy";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import { Episode } from "./Watch";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { scrollToTop } from "../../utils";
import {
  setCurrentEpisode,
  updateWatchedEpisodes,
} from "../../redux/slice/watchSlice";
import { useParams } from "react-router-dom";
import ButtonSeeMore from "../../components/common/ButtonSeeMore";

const SectionListEpisodes = () => {
  const episodesFromStore = useSelector(
    (state: RootState) => state.movies.movieInfo.episodes
  );
  const dubbedEpisodesFromStore = useSelector(
    (state: RootState) => state.movies.movieInfo.dubbedEpisodes
  );
  const watchedEpisodes = useSelector(
    (state: RootState) => state.watch.watchedEpisodes
  );
  const movieInfo = useSelector(
    (state: RootState) => state.movies.movieInfo.info
  );
  const theme = useSelector((state: RootState) => state.system.theme);
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [dubbedEpisodes, setDubbedEpisodes] = useState<Episode[]>([]);
  const currentEpisode = useSelector(
    (state: RootState) => state.watch.currentEpisode
  );

  useEffect(() => {
    setEpisodes(episodesFromStore.slice(0, 50));
    setDubbedEpisodes(dubbedEpisodesFromStore.slice(0, 50));
  }, [episodesFromStore, dubbedEpisodesFromStore]);

  const handleChangeEpisode = (item: Episode) => {
    dispatch(setCurrentEpisode(item));
    scrollToTop();
    handleUpdateWatchedEpisodes(item);
  };

  const handleUpdateWatchedEpisodes = (item: Episode) => {
    dispatch(
      updateWatchedEpisodes({
        currentEpisode: item,
        slug: params.slug,
      })
    );
  };

  return (
    <>
      {/* Danh sách tập phim gốc */}
      <Alert sx={{ flexDirection: "column", alignItems: "start", gap: "24px" }}>
        <Typography startDecorator={<SubscriptionsOutlinedIcon />} level="title-lg">
          Danh sách tập phim
        </Typography>
        <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {episodes.map((item: Episode, index: number) => (
            <Button
              sx={{ flex: "auto" }}
              key={index}
              color={theme === "light" ? "primary" : "neutral"}
              variant={item.slug === currentEpisode.slug ? "solid" : "soft"}
              onClick={() => handleChangeEpisode(item)}
            >
              {item.name}
            </Button>
          ))}
        </Box>
      </Alert>

      {/* Danh sách tập phim lồng tiếng */}
      <Alert sx={{ flexDirection: "column", alignItems: "start", gap: "24px", marginTop: "24px" }}>
        <Typography startDecorator={<SubscriptionsOutlinedIcon />} level="title-lg">
          Danh sách tập phim lồng tiếng
        </Typography>
        <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {dubbedEpisodes.map((item: Episode, index: number) => (
            <Button
              sx={{ flex: "auto" }}
              key={index}
              color={theme === "light" ? "primary" : "neutral"}
              variant={item.slug === currentEpisode.slug ? "solid" : "soft"}
              onClick={() => handleChangeEpisode(item)}
            >
              {item.name}
            </Button>
          ))}
        </Box>
      </Alert>
    </>
  );
};

export default SectionListEpisodes;
