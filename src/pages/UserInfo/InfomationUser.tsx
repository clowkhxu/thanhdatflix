import { Box, Button, Table, Typography } from "@mui/joy";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const InfomationUser = ({ setOpenModalEditUserInfo }: any) => {
  const user = useSelector((state: RootState) => state.users.user);
  const theme = useSelector((state: RootState) => state.system.theme);

  return (
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
        color={theme === "light" ? "primary" : "neutral"}
      >
        Thông tin người dùng
      </Typography>

      <Table sx={{ marginTop: "12px" }} aria-label="basic table">
        <tbody>
          <tr>
            <td style={{ fontWeight: "bold" }}>Tên:</td>
            <td style={{ wordWrap: "break-word" }}>{user.username}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Email:</td>
            <td style={{ wordWrap: "break-word" }}>{user.email}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Số điện thoại:</td>
            <td style={{ wordWrap: "break-word" }}>
              {user?.phone_number ?? "Không xác định"}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Giới tính:</td>
            <td style={{ wordWrap: "break-word" }}>
              {user.gender ?? "Không xác định"}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Địa chỉ:</td>
            <td style={{ wordWrap: "break-word" }}>
              {user.address ?? "Không xác định"}
            </td>
          </tr>
        </tbody>
      </Table>

      <Button
        onClick={() => setOpenModalEditUserInfo(true)}
        sx={{
          marginTop: "12px",
        }}
        color={theme === "light" ? "primary" : "neutral"}
      >
        Chỉnh sửa thông tin
      </Button>
    </Box>
  );
};

export default InfomationUser;
