import { Divider, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import _NavLink from "../../common/_NavLink";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/asyncThunk/userThunk";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ModalSetting from "../../modals/ModalSetting";

const UserOptions = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.system.theme);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const res = await dispatch(logout());
    if (+res.payload?.EC === 0) {
      toast.success(res.payload?.EM);
      navigate("/");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Dropdown>
        <MenuButton
          loading={isLoading}
          sx={{
            width: "36px",
            height: "36px",
            borderRadius: "12px",
            boxShadow:
              theme === "light"
                ? "rgb(255, 255, 255) 0px 0px 0px inset, rgba(232, 234, 238, 0.4) 0px -1px 0px inset, rgba(223, 226, 231, 0.5) 0px 1px 2px 0px;"
                : "unset",
          }}
        >
          {!isLoading && (
            <AccountCircleIcon
              color={theme === "light" ? "primary" : "secondary"}
            />
          )}
        </MenuButton>
        <Menu>
          <MenuItem onClick={() => navigate("/trang-ca-nhan")}>
            <PersonIcon />
            Trang cá nhân
          </MenuItem>
          <MenuItem onClick={() => setOpenModal(true)}>
            <SettingsIcon />
            Cài đặt
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleLogout()}>
            <LogoutIcon/>
            Đăng xuất
          </MenuItem>
        </Menu>
      </Dropdown>

      <ModalSetting openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default UserOptions;
