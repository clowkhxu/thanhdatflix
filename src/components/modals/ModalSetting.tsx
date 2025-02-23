import {
  Box,
  Button,
  Chip,
  Divider,
  ModalClose,
  Switch,
  Typography,
} from "@mui/joy";
import ModalContainer from "./ModalContainer";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setIncognitoMode } from "../../redux/slice/systemSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import ModalAlertDialog from "./ModalAlertDialog";
import {
  deleteAllMovie,
  getAllMovies,
} from "../../redux/asyncThunk/moviesThunk";
import {
  deleleActivityLog,
  getActivityLog,
} from "../../redux/asyncThunk/activityLogThunk";
import {
  deleteAllSearchHistory,
  getSearchHistory,
} from "../../redux/asyncThunk/searchHistoryThunk";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingItem from "../common/SettingItem";
import TitleModal from "../common/TitleModal";

interface ModalSettingProps {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
}

const ModalSetting = ({ openModal, setOpenModal }: ModalSettingProps) => {
  const theme = useSelector((state: RootState) => state.system.theme);
  const incognitoMode = useSelector(
    (state: RootState) => state.system.incognitoMode
  );
  const dispatch: AppDispatch = useDispatch();
  const [openModalAlert, setOpenModalAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.users.user);
  const savedMovies = useSelector(
    (state: RootState) => state.movies.savedMovies.movies
  );
  const watchHistory = useSelector(
    (state: RootState) => state.movies.watchHistory.movies
  );
  const activityLog = useSelector(
    (state: RootState) => state.activityLog.activityList
  );
  const searchRecent = useSelector(
    (state: RootState) => state.searchHistory.searchRecent
  );
  const searchFavourite = useSelector(
    (state: RootState) => state.searchHistory.searchFavourite
  );

  const handleChangeIncognitoMode = () => {
    dispatch(setIncognitoMode(!incognitoMode));
    toast.success(
      !incognitoMode ? "Đã bật chế độ ẩn danh" : "Đã tắt chế độ ẩn danh"
    );
  };

  const handleDeleteAllData = async () => {
    const searchHistory = [...searchRecent, ...searchFavourite];

    if (
      searchHistory?.length === 0 &&
      savedMovies?.length === 0 &&
      watchHistory?.length === 0 &&
      activityLog?.length === 0
    ) {
      toast("Không có gì để xoá cả!", {
        icon: "😒",
      });
      setOpenModalAlert(false);
      setOpenModal(true);
      return;
    }

    try {
      setIsLoading(true);

      if (savedMovies?.length > 0) {
        await dispatch(
          deleteAllMovie({
            userId: user?.id as string,
            type: "saved-movies",
          })
        );

        if (window.location.pathname === "/phim-da-luu") {
          await dispatch(
            getAllMovies({ userId: user?.id as string, type: "saved-movies" })
          );
        }
      }

      if (watchHistory?.length > 0) {
        await dispatch(
          deleteAllMovie({
            userId: user?.id as string,
            type: "watch-history",
          })
        );

        if (window.location.pathname === "/lich-su-da-xem") {
          await dispatch(
            getAllMovies({ userId: user?.id as string, type: "watch-history" })
          );
        }
      }

      if (activityLog?.length > 0) {
        await dispatch(deleleActivityLog(user?.id as string));

        if (window.location.pathname === "/trang-ca-nhan") {
          await dispatch(getActivityLog(user?.id as string));
        }
      }

      if (searchHistory?.length > 0) {
        await dispatch(deleteAllSearchHistory(user?.id as string));
        await dispatch(getSearchHistory(user?.id as string));
      }

      setOpenModalAlert(false);
      toast.success("Đã xoá tất cả dữ liệu thành công!");
    } catch (error) {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setOpenModalAlert(false);
    setOpenModal(true);
  };

  return (
    <>
      <ModalContainer
        open={openModal}
        setOpen={setOpenModal}
        sx={{
          animation: "scaleIn 0.3s",
          minWidth: {
            xs: "90%",
            md: "360px",
          },
          maxWidth: {
            xs: "90%",
            md: "380px",
          },
          minHeight: "200px",
          borderRadius: "md",
          p: 2,
          boxShadow: "lg",
        }}
      >
        <TitleModal title="Cài đặt" marginDivider="12px -16px" />

        <Box
          sx={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <SettingItem
            start={<Typography>Chế độ ẩn danh</Typography>}
            end={
              <Switch
                checked={incognitoMode}
                onChange={() => handleChangeIncognitoMode()}
              />
            }
            bottom={
              <Typography level="body-sm">
                Lịch sử xem phim, lịch sử tìm kiếm và lịch sử hoạt động của bạn
                sẽ không lưu lại
              </Typography>
            }
          />

          <SettingItem
            start={<Typography>Xoá tất cả dữ liệu</Typography>}
            end={
              <Chip
                onClick={() => {
                  setOpenModalAlert(true);
                  setOpenModal(false);
                }}
                endDecorator={<DeleteForeverIcon />}
                color="danger"
                variant={theme === "light" ? "outlined" : "solid"}
              >
                Xoá
              </Chip>
            }
            bottom={
              <Typography level="body-sm">
                Lịch sử xem phim, phim đã lưu, lịch sử tìm kiếm và lịch sử hoạt động của
                bạn sẽ bị xoá vĩnh viễn
              </Typography>
            }
          />
        </Box>
      </ModalContainer>

      <ModalAlertDialog
        isLoading={isLoading}
        open={openModalAlert}
        setOpen={setOpenModalAlert}
        title="Xoá tất cả dữ liệu"
        content="Bạn có chắc chắn muốn xoá tất cả dữ liệu không?"
        handleSubmit={handleDeleteAllData}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default ModalSetting;
