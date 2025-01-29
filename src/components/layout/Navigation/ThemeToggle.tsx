import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { IconButton, useColorScheme } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { changeTheme } from "../../../redux/slice/systemSlice";
import toast from "react-hot-toast";
import { useSelect } from "@mui/base";

const ThemeToggle = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.system.theme);
  const { mode, setMode } = useColorScheme();

  const handleChangeTheme = (theme: "light" | "dark") => {
    dispatch(changeTheme(theme));
    setMode(theme);
    toast.success(`Chế độ ${theme === "light" ? "sáng" : "tối"}`);
  };

  return (
    <>
      <IconButton
        sx={{ borderRadius: "12px" }}
        variant="outlined"
        color={theme === "light" ? "primary" : "neutral"}
        onClick={() => handleChangeTheme(mode === "light" ? "dark" : "light")}
      >
        {mode === "light" ? (
          <LightModeOutlinedIcon />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </IconButton>
    </>
  );
};

export default ThemeToggle;
