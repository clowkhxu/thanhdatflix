import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Box, Button, IconButton, Input, Typography } from "@mui/joy";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { setType } from "../../redux/slice/systemSlice";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import _ from "lodash";
import { register, sendOTP } from "../../redux/asyncThunk/userThunk";
import toast from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { validateEmail } from "../../utils";

interface ValueInput {
  username: string;
  email: string;
  password: string;
  authCode: string;
}

interface ValidInput {
  username: boolean;
  email: boolean;
  password: boolean;
  authCode: boolean;
}

interface IProps {
  setOpen: (open: boolean) => void;
}

const Register = ({ setOpen }: IProps) => {
  const dispatch: AppDispatch = useDispatch();
  const defaultValueRegister: ValueInput = {
    email: "",
    password: "",
    username: "",
    authCode: "",
  };
  const defaultValidIput: ValidInput = {
    email: true,
    password: true,
    username: true,
    authCode: true,
  };
  const [valueInput, setValueInput] =
    useState<ValueInput>(defaultValueRegister);
  const [isValidInput, setIsValidInput] =
    useState<ValidInput>(defaultValidIput);
  const [isLoadingSendCode, setIsLoadingSendCode] = useState<boolean>(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const theme = useSelector((state: RootState) => state.system.theme);

  const handleCheckValidInput = (): boolean => {
    let check: boolean = true;
    const _isValidInput: ValidInput = _.clone(isValidInput);

    if (valueInput.username === "") {
      _isValidInput.username = false;
      check = false;
    }

    if (valueInput.email === "") {
      _isValidInput.email = false;
      check = false;
    }

    if (valueInput.password === "") {
      _isValidInput.password = false;
      check = false;
    }

    if (valueInput.authCode === "") {
      _isValidInput.authCode = false;
      check = false;
    }

    setIsValidInput(_isValidInput);
    return check;
  };

  const handleOnchangeInput = (value: string, type: string) => {
    const _valueInput: ValueInput = _.clone(valueInput);
    const _isValidInput: ValidInput = _.clone(isValidInput);
    (_valueInput as any)[type] = value;
    (_isValidInput as any)[type] = true;
    setValueInput(_valueInput);
    setIsValidInput(_isValidInput);
  };

  const handleRegister = async () => {
    const check: boolean = handleCheckValidInput();

    if (check) {
      setIsLoadingRegister(true);
      const res: any = await dispatch(
        register({
          email: valueInput.email,
          username: valueInput.username,
          password: valueInput.password,
          code: valueInput.authCode,
          type_account: "LOCAL",
          type_otp: "REGISTER",
        })
      );

      if (+res.payload?.EC === 0) {
        toast.success(res.payload?.EM ?? "Đăng ký tài khoản thành công!");
        dispatch(setType("login"));
        setOpen(false);
      } else {
        toast.error(res.payload?.EM ?? "Đăng ký tài khoản thất bại!");
      }

      setIsLoadingRegister(false);
    }
  };

  const handleSendOTP = async () => {
    if (!validateEmail(valueInput.email)) {
      return toast.error("Email không hợp lệ!");
    }

    setIsLoadingSendCode(true);
    const res: any = await dispatch(
      sendOTP({
        email: valueInput.email,
        type_otp: "REGISTER",
      })
    );

    if (+res.payload?.EC === 0) {
      toast.success(res.payload?.EM);
    } else {
      toast.error(res.payload?.EM);
    }
    setIsLoadingSendCode(false);
  };

  return (
    <>
      <Typography
        sx={{ marginBottom: "12px" }}
        level="title-lg"
        color={theme === "light" ? "primary" : "neutral"}
      >
        Đăng ký
      </Typography>
      <Box>
        <Input
          error={!isValidInput.username}
          onChange={(e) => handleOnchangeInput(e.target.value, "username")}
          value={valueInput.username}
          startDecorator={<PersonOutlineIcon />}
          size="md"
          placeholder="Tên người dùng"
          type="text"
        />
        {!isValidInput.username && (
          <Typography level="title-sm" color="danger" sx={{ marginTop: "8px" }}>
            Tên người dùng không được bỏ trống!
          </Typography>
        )}
      </Box>
      <Box>
        <Input
          error={!isValidInput.email}
          onChange={(e) => handleOnchangeInput(e.target.value, "email")}
          value={valueInput.email}
          startDecorator={<AlternateEmailIcon />}
          size="md"
          placeholder="Email"
          type="email"
        />
        {!isValidInput.email && (
          <Typography level="title-sm" color="danger" sx={{ marginTop: "8px" }}>
            Email không được bỏ trống!
          </Typography>
        )}
      </Box>
      <Box>
        <Input
          error={!isValidInput.password}
          onChange={(e) => handleOnchangeInput(e.target.value, "password")}
          value={valueInput.password}
          startDecorator={<LockOutlinedIcon />}
          size="md"
          placeholder="Mật khẩu"
          type={showPassword ? "text" : "password"}
          endDecorator={
            showPassword ? (
              <IconButton onClick={() => setShowPassword(false)}>
                <VisibilityIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => setShowPassword(true)}>
                <VisibilityOffIcon />
              </IconButton>
            )
          }
        />
        {!isValidInput.password && (
          <Typography level="title-sm" color="danger" sx={{ marginTop: "8px" }}>
            Mật khẩu không được bỏ trống!
          </Typography>
        )}
      </Box>
      <Box>
        <Input
          error={!isValidInput.authCode}
          onChange={(e) => handleOnchangeInput(e.target.value, "authCode")}
          value={valueInput.authCode}
          startDecorator={<KeyIcon />}
          size="md"
          placeholder="Mã xác thực"
          endDecorator={
            <Button
              loading={isLoadingSendCode}
              disabled={valueInput.email === ""}
              onClick={() => handleSendOTP()}
              variant={theme === "light" ? "soft" : "solid"}
              color={theme === "light" ? "primary" : "neutral"}
            >
              Gửi mã
            </Button>
          }
        />

        {!isValidInput.authCode && (
          <Typography level="title-sm" color="danger" sx={{ marginTop: "8px" }}>
            Mã xác thực không được bỏ trống!
          </Typography>
        )}
      </Box>

      <Button
        color={theme === "light" ? "primary" : "neutral"}
        loading={isLoadingRegister}
        onClick={() => handleRegister()}
      >
        Đăng ký
      </Button>

      <Box
        sx={{
          display: "flex",
          gap: "4px",
          marginTop: "12px",
          justifyContent: "center",
        }}
      >
        <Typography level="title-sm" color="neutral">
          Đã có tài khoản?
        </Typography>
        <Typography
          onClick={() => dispatch(setType("login"))}
          level="title-sm"
          color={theme === "light" ? "primary" : "neutral"}
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Đăng nhập
        </Typography>
      </Box>
    </>
  );
};

export default Register;
