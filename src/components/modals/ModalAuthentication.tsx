import { Box, Modal, ModalClose, Sheet } from "@mui/joy";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import ForgotPassword from "../authentication/ForgotPassword";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setType } from "../../redux/slice/systemSlice";
import ModalContainer from "./ModalContainer";
interface IProps {
  type: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalAuthentication = ({ type, open, setOpen }: IProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleClose = () => {
    if (type === "forgot-password" || type === "register") {
      dispatch(setType("login"));
    }
    setOpen(false);
  };

  return (
    <ModalContainer
      open={open}
      setOpen={setOpen}
      sx={{
        animation: "scaleIn 0.3s",
        minWidth: {
          xs: "90%",
          sm: "500px",
        },
        maxWidth: {
          xs: "90%",
          sm: "520px",
        },
        maxHeight: {
          xs: "80vh",
          sm: "90%",
        },
        borderRadius: "md",
        p: 3,
        boxShadow: "lg",
        backdropFilter: "unset",
        overflowY: "auto",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {type === "login" && <Login setOpen={setOpen} />}
        {type === "register" && <Register setOpen={setOpen} />}
        {type === "forgot-password" && <ForgotPassword setOpen={setOpen} />}
      </Box>
    </ModalContainer>
  );
};

export default ModalAuthentication;
