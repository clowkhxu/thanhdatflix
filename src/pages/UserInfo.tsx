import { Box, Grid } from "@mui/joy";
import backgroundMovieImg from "../images/background-movie.jpg";
import { useEffect, useState } from "react";
import ModalEditUserInfo from "../components/modals/ModalEditUserInfo";
import ModalAlertDialog from "../components/modals/ModalAlertDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import avatarImg from "../images/avatar.jpg";
import { useNavigate } from "react-router-dom";
import {
  getActivityLog,
  deleleActivityLog,
} from "../redux/asyncThunk/activityLogThunk";
import SkeletonActivityLog from "../components/common/SkeletonActivityLog";
import InfomationUser from "./UserInfo/InfomationUser";
import TableActivitiesUser from "./UserInfo/TableActivitiesUser";

const UserInfo = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [openModalEditUserInfo, setOpenModalEditUserInfo] =
    useState<boolean>(false);
  const [openModalAlertDialog, setOpenModalAlertDialog] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.refresh_token || !user?.access_token) {
      navigate("/");
    }

    const handleInit = async () => {
      setIsLoading(true);
      await dispatch(getActivityLog(user?.id as string));
      setIsLoading(false);
    };
    handleInit();
  }, []);

  const handleDeleteActivityHistory = async () => {
    setIsLoadingButton(true);
    await dispatch(deleleActivityLog(user?.id as string));
    await dispatch(getActivityLog(user?.id as string));
    setOpenModalAlertDialog(false);
    setIsLoadingButton(false);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={12} md={12}>
          <Box
            sx={{
              position: "relative",
              marginBottom: "120px",
            }}
          >
            <Box
              sx={{
                borderRadius: "12px",
                width: "100%",
                height: {
                  xs: "260px",
                  md: "320px",
                },
                backgroundImage: `url(${backgroundMovieImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: {
                xs: "330px",
                md: "400px",
              },
              left: {
                xs: "50%",
                md: "16%",
              },
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: "5px solid #ccc",
              overflow: "hidden",
              width: "160px",
              height: "160px",
            }}
          >
            <img src={avatarImg} alt="Ảnh đại diện" />
          </Box>
        </Grid>
        <Grid xs={12} md={4}>
          <InfomationUser setOpenModalEditUserInfo={setOpenModalEditUserInfo} />
        </Grid>
        <Grid xs={12} md={8}>
          {isLoading && <SkeletonActivityLog />}
          {!isLoading && (
            <TableActivitiesUser
              setOpenModalAlertDialog={setOpenModalAlertDialog}
            />
          )}
        </Grid>
      </Grid>

      <ModalEditUserInfo
        open={openModalEditUserInfo}
        setOpen={setOpenModalEditUserInfo}
        dataUser={user}
      />

      <ModalAlertDialog
        isLoading={isLoadingButton}
        open={openModalAlertDialog}
        title="Xoá lịch sử hoạt động"
        content="Bạn có chắc chắn muốn xoá lịch sử hoạt động?"
        setOpen={setOpenModalAlertDialog}
        handleSubmit={handleDeleteActivityHistory}
      />
    </>
  );
};

export default UserInfo;
