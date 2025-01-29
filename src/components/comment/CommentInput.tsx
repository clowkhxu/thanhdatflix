import { Box, Button, Textarea } from "@mui/joy";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addComment,
  getCommentList,
} from "../../redux/asyncThunk/commentThunk";
import toast from "react-hot-toast";
import { addActivityLog } from "../../redux/asyncThunk/activityLogThunk";
import { IUser } from "../../interfaces/user";
import { IMovie } from "../../interfaces/movie";
import { isEmpty } from "lodash";
import { socket } from "../../socket";

const CommentInput = () => {
  const dispatch: AppDispatch = useDispatch();
  const [valueComment, setValueComment] = useState<string>("");
  const params = useParams();
  const user: IUser = useSelector((state: RootState) => state?.users?.user);
  const movieInfo: IMovie = useSelector(
    (state: RootState) => state.movies.movieInfo.info
  );
  const theme = useSelector((state: RootState) => state.system.theme);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const incognitoMode = useSelector(
    (state: RootState) => state.system.incognitoMode
  );

  const handleAddComment = async () => {
    if (!user.access_token || !user.refresh_token) {
      toast.error("Vui lòng đăng nhập để bình luận!");
      return;
    }

    if (isEmpty(valueComment.trim())) {
      toast.error("Vui lòng nhập bình luận!");
      return;
    }

    setIsLoading(true);
    const res = await dispatch(
      addComment({
        userId: user?.id as string,
        movieSlug: params.slug as string,
        content: valueComment,
      })
    );

    if (+res.payload?.EC === 0) {
      setIsLoading(false);
      setValueComment("");
      toast.success("Bình luận thành công!");

      if (!incognitoMode) {
        await dispatch(
          addActivityLog({
            userId: user?.id as string,
            action: `Bình luận "${valueComment}" tại phim ${movieInfo.name}`,
          })
        );
      }

      socket.emit("addComment", {
        slug: params?.slug,
      });
    } else {
      setIsLoading(false);
      toast.error(res.payload?.EM);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        gap: "12px",
      }}
    >
      <Textarea
        disabled={isLoading}
        value={valueComment}
        onChange={(e) => setValueComment(e.target.value)}
        sx={{ width: "100%" }}
        minRows={3}
        placeholder="Nhập bình luận của bạn..."
      />

      <Button
        loading={isLoading}
        onClick={() => handleAddComment()}
        disabled={valueComment === ""}
        color={theme === "light" ? "primary" : "neutral"}
        variant="solid"
      >
        Bình luận
      </Button>
    </Box>
  );
};

export default CommentInput;
