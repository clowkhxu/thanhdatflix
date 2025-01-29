import { Box, Grid, Skeleton, Table, Typography } from "@mui/joy";
import backgroundMovieImg from "../images/background-movie.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import avatarImg from "../images/avatar.jpg";
import { IUser } from "../interfaces/user";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAnotherUserInfo } from "../redux/asyncThunk/userThunk";
import toast from "react-hot-toast";
import { formatDate } from "../utils";

const AnotherUserInfo = () => {
  const dispatch: AppDispatch = useDispatch();
  const anotherUser: IUser = useSelector(
    (state: RootState) => state.users.anotherUser
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleInit = async () => {
      setIsLoading(true);
      const res: any = await dispatch(getAnotherUserInfo(params.id as string));
      if (+res.payload?.EC !== 0) {
        toast.error(res.payload?.EM);
        navigate("/");
      }
      setIsLoading(false);
    };
    handleInit();
  }, []);

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
        <Grid xs={12} md={12}>
          {isLoading ? (
            <Box>
              <Skeleton variant="text" level="h1" />
              <Skeleton variant="text" level="h3" />
              <Skeleton variant="text" level="h3" />
              <Skeleton variant="text" level="h3" />
            </Box>
          ) : (
            <Box
              sx={{
                border: "1px solid rgba(61, 71, 81, 0.3)",
                padding: "16px",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <Typography
                startDecorator={<AccountCircleIcon />}
                level="title-lg"
                color="primary"
              >
                Thông tin người dùng
              </Typography>

              <Table sx={{ marginTop: "12px" }} aria-label="basic table">
                <tbody>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Tên:</td>
                    <td style={{ wordWrap: "break-word" }}>
                      {anotherUser.username}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Giới tính:</td>
                    <td style={{ wordWrap: "break-word" }}>
                      {anotherUser.gender ?? "Không xác định"}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Ngày tham gia:</td>
                    <td style={{ wordWrap: "break-word" }}>
                      {formatDate(anotherUser?.createdAt as string) ??
                        "Không xác định"}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default AnotherUserInfo;
