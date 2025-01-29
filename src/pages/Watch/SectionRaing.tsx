import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IUser } from "../../interfaces/user";
import { AppDispatch, RootState } from "../../redux/store";
import { addMovieRating, getRatings } from "../../redux/asyncThunk/ratingThunk";
import { socket } from "../../socket";
import toast from "react-hot-toast";
import { addActivityLog } from "../../redux/asyncThunk/activityLogThunk";
import { Alert, Box, Chip, Skeleton, Tooltip, Typography } from "@mui/joy";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import { Experimental_CssVarsProvider, Rating } from "@mui/material";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import ModalListUserRating from "../../components/modals/ModalListUserRating";

const SectionRating = () => {
  const [stars, setStars] = useState<number>(0);
  const params = useParams();
  const user: IUser = useSelector((state: RootState) => state.users.user);
  const dispatch: AppDispatch = useDispatch();
  const rating = useSelector((state: RootState) => state.rating);
  const movieInfo = useSelector(
    (state: RootState) => state.movies.movieInfo.info
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const theme = useSelector((state: RootState) => state.system.theme);
  const incognitoMode = useSelector(
    (state: RootState) => state.system.incognitoMode
  );

  const handleRefreshRating = async () => {
    setIsLoading(true);
    await dispatch(
      getRatings({
        movieSlug: params.slug as string,
        userId: user?.id as string,
      })
    );
    setIsLoading(false);
  };

  useEffect(() => {
    socket.on("refreshRating", (res) => {
      if (res?.slug === params?.slug) {
        handleRefreshRating();
      }
    });

    return () => {
      socket.off("refreshRating");
    };
  }, []);

  useEffect(() => {
    if (user?.access_token || user?.refresh_token) {
      handleRefreshRating();
    }
  }, [user]);

  useEffect(() => {
    setStars(rating?.ratingWidthUser);
  }, [rating]);

  const handleAddRating = async (stars: number) => {
    if (!user.access_token || !user.refresh_token) {
      toast.error("Vui lòng đăng nhập để đánh giá!");
      return;
    }

    setIsLoading(true);
    setStars(stars);
    const res = await dispatch(
      addMovieRating({
        userId: user?.id as string,
        movieSlug: params.slug as string,
        rating: stars,
      })
    );

    if (+res.payload?.EC === 0) {
      if (!incognitoMode) {
        await dispatch(
          addActivityLog({
            userId: user?.id as string,
            action: `Đánh giá ${stars} sao phim ${movieInfo.name}`,
          })
        );
      }

      toast.success("Cảm ơn bạn đã đánh giá phim!");

      socket.emit("addRating", { slug: params?.slug });
    } else {
      toast.error(res.payload?.EM);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Alert
        sx={{
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <Typography startDecorator={<PollOutlinedIcon />} level="title-lg">
            Đánh giá phim
          </Typography>
          {isLoading ? (
            <Skeleton variant="text" level="body-xs" width={50} height={20} />
          ) : (
            <Chip
              endDecorator={<StarBorderRoundedIcon />}
              variant="outlined"
              color={theme === "light" ? "primary" : "neutral"}
            >
              {rating.averageRating} / 5.0
            </Chip>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flex: "1",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <>
              <Skeleton variant="text" level="h3" width={100} />
              <Skeleton
                variant="text"
                level="body-xs"
                width={100}
                height={20}
              />
            </>
          ) : (
            <>
              <Experimental_CssVarsProvider>
                <Rating
                  sx={{
                    "& span": {
                      color: `${
                        theme === "dark"
                          ? "#9FA6AD !important"
                          : "#0b6bcb !important"
                      }`,
                    },
                  }}
                  color="primary"
                  onChange={(event, value) => handleAddRating(value as number)}
                  name="half-rating"
                  value={stars}
                  precision={1}
                />
              </Experimental_CssVarsProvider>
              <Tooltip title="Danh sách đánh giá">
                <Typography
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={() => setOpenModal(true)}
                  level="title-sm"
                  color="neutral"
                >
                  {rating.countRating} lượt đánh giá
                </Typography>
              </Tooltip>
            </>
          )}
        </Box>
      </Alert>

      <ModalListUserRating open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export default SectionRating;
