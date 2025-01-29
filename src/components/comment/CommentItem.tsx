import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Textarea,
  Tooltip,
  Typography,
} from "@mui/joy";
import { formatDate } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { IUser } from "../../interfaces/user";
import { Link } from "react-router-dom";
import avatarImg from "../../images/avatar.jpg";
import {
  setEditComment,
  setIdComment,
  setIndexEdit,
  setOpenModalAlertDialog,
  setOpenModalReportComment,
  setValueEditComment,
} from "../../redux/slice/commentsSlice";

interface CommentItem {
  item: any;
  index: number;
  isLoading: boolean;
  handSaveEditComment: (idComment: string) => void;
}

const CommentItem = ({
  item,
  index,
  isLoading,
  handSaveEditComment,
}: CommentItem) => {
  const dispatch: AppDispatch = useDispatch();
  const user: IUser = useSelector((state: RootState) => state.users.user);
  const indexEdit = useSelector((state: RootState) => state.comments.indexEdit);
  const valueEditComment = useSelector(
    (state: RootState) => state.comments.valueEditComment
  );
  const theme = useSelector((state: RootState) => state.system.theme);

  const handleOpenModalAlerDialog = (idComment: string) => {
    dispatch(setOpenModalAlertDialog(true));
    dispatch(setIdComment(idComment));
  };

  const handleOpenModalReportComment = (idComment: string) => {
    dispatch(setOpenModalReportComment(true));
    dispatch(setIdComment(idComment));
  };

  return (
    <li style={{ display: "flex", gap: "12px" }}>
      <Box>
        <Avatar alt={item?.username} src={avatarImg} />
      </Box>
      <Box
        sx={{
          border: `3px solid ${
            theme === "light" ? "#f0f4f8" : "rgba(61, 71, 81, 0.3)"
          }`,
          padding: "8px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: `${indexEdit !== -1 ? "100%" : "unset"}`,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Tooltip title="Xem trang cá nhân" color="primary" variant="soft">
              <Typography
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                level="title-sm"
                color={theme === "light" ? "primary" : "neutral"}
              >
                <Link
                  style={{ all: "unset" }}
                  to={
                    item?.user_id === user?.id
                      ? "/trang-ca-nhan"
                      : `/xem-thong-tin/${item?.user_id}`
                  }
                >
                  {item["user.username"]}
                </Link>
              </Typography>
            </Tooltip>
            <Chip
              variant="outlined"
              color={theme === "light" ? "neutral" : "primary"}
              size="sm"
            >
              {formatDate(item?.createdAt)}
            </Chip>
          </Box>
          {index !== indexEdit ? (
            <Typography
              sx={{
                wordBreak: "break-word",
              }}
              level="body-sm"
            >
              {item.content}
            </Typography>
          ) : (
            <Textarea
              onChange={(e) => dispatch(setValueEditComment(e.target.value))}
              sx={{ marginTop: "12px" }}
              value={valueEditComment}
              variant="outlined"
            />
          )}
        </Box>
        <Divider />
        {index !== indexEdit ? (
          <Box sx={{ display: "flex", gap: "12px" }}>
            {item?.user_id === user?.id && (
              <>
                <Button
                  onClick={() => handleOpenModalAlerDialog(item?.id)}
                  variant={theme === "light" ? "plain" : "solid"}
                  color="danger"
                  size="sm"
                >
                  Xoá
                </Button>
                <Button
                  onClick={() =>
                    dispatch(setEditComment({ index, content: item.content }))
                  }
                  variant={theme === "light" ? "plain" : "solid"}
                  color={theme === "light" ? "primary" : "neutral"}
                  size="sm"
                >
                  Chỉnh sửa
                </Button>
              </>
            )}
            {item?.user_id !== user?.id && (
              <Button
                onClick={() => handleOpenModalReportComment(item?.id)}
                variant="plain"
                color="neutral"
                size="sm"
              >
                Báo cáo
              </Button>
            )}
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: "12px" }}>
            <Button
              onClick={() => dispatch(setIndexEdit(-1))}
              variant="plain"
              color="neutral"
              size="sm"
            >
              Huỷ
            </Button>
            <Button
              loading={isLoading}
              onClick={() => handSaveEditComment(item?.id)}
              variant="solid"
              color={theme === "light" ? "primary" : "neutral"}
              size="sm"
            >
              Lưu
            </Button>
          </Box>
        )}
      </Box>
    </li>
  );
};

export default CommentItem;
