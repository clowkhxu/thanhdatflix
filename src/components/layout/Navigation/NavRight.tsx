import { Box, Button, IconButton } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import UserOptions from "./UserOptions";
import { useState } from "react";
import ModalSearch from "../../modals/ModalSearch/ModalSearch";
import ModalAuthentication from "../../modals/ModalAuthentication";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setType } from "../../../redux/slice/systemSlice";
import { IUser } from "../../../interfaces/user";
import ThemeToggle from "./ThemeToggle";

type NavRightProps = {
  width: number;
};

type Authentication = "login" | "register" | "forgot-password";

const NavRight = ({ width }: NavRightProps) => {
  const [openModalSearch, setOpenModalSearch] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const open = useSelector(
    (state: RootState) => state.system.isOpenModalAuthentication
  );
  const type = useSelector((state: RootState) => state.system.type);
  const user: IUser = useSelector((state: RootState) => state.users.user);
  const theme = useSelector((state: RootState) => state.system.theme);

  const handleAuthentication = (type: Authentication) => {
    dispatch(setOpen(true));
    dispatch(setType(type));
  };

  const handleSetOpen = (isOpen: boolean) => {
    dispatch(setOpen(isOpen));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          maxHeight: "36px",
        }}
      >
        {width > 1024 ? (
          <>
            <Button
              sx={{
                "&:hover": {
                  color: "#000",
                  animation: "smartGradient 2.1s linear infinite",
                  background:
                    "linear-gradient(135deg, #d3e3fd, #d7f6ff, #a8c7fa, #a7edff, #d3e3fd, #d3e3fd, #d7f6ff, #a8c7fa, #a7edff, #d3e3fd)",
                  backgroundSize: "800% 800%",
                },
                padding: "8px 12px",
                justifyContent: "start",
                minWidth: "220px",
                borderRadius: "12px",
                boxShadow:
                  theme === "light"
                    ? "rgb(255, 255, 255) 0px 0px 0px inset, rgba(232, 234, 238, 0.4) 0px -1px 0px inset, rgba(223, 226, 231, 0.5) 0px 1px 2px 0px;"
                    : "unset",
              }}
              onClick={() => setOpenModalSearch(true)}
              variant="outlined"
              color={theme === "light" ? "primary" : "neutral"}
              startDecorator={
                <SearchIcon
                  color={theme === "light" ? "primary" : "secondary"}
                />
              }
            >
              Tìm kiếm phim...
            </Button>
          </>
        ) : (
          <>
            <IconButton
              sx={{
                borderRadius: "12px",
                boxShadow:
                  theme === "light"
                    ? "rgb(255, 255, 255) 0px 0px 0px inset, rgba(232, 234, 238, 0.4) 0px -1px 0px inset, rgba(223, 226, 231, 0.5) 0px 1px 2px 0px;"
                    : "unset",
              }}
              onClick={() => setOpenModalSearch(true)}
              variant="outlined"
              color={theme === "light" ? "primary" : "neutral"}
            >
              <SearchIcon />
            </IconButton>
          </>
        )}

        <ThemeToggle />

        {!user?.refresh_token ? (
          <Box sx={{ display: "flex", gap: "12px" }}>
            <Button
              size="sm"
              color="neutral"
              onClick={() => handleAuthentication("login")}
              variant={theme === "light" ? "plain" : "solid"}
            >
              Đăng nhập
            </Button>
            <Button
              size="sm"
              onClick={() => handleAuthentication("register")}
              variant="solid"
            >
              Đăng ký
            </Button>
          </Box>
        ) : (
          <UserOptions />
        )}
      </Box>

      <ModalSearch open={openModalSearch} setOpen={setOpenModalSearch} />

      <ModalAuthentication type={type} open={open} setOpen={handleSetOpen} />
    </>
  );
};

export default NavRight;
